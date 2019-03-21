import Path from 'path-parser'
import React from 'react'

function matchRoute(route, currentRoute, parentPath)
{
    if(currentRoute == null) return null
    if(route.props.path == null) return null

    let path = parentPath + route.props.path
    let currentURL = currentRoute.search != undefined ? currentRoute.pathname + currentRoute.search: currentRoute.pathname;
    let parser = new Path(path);
    let match = parser.partialTest(currentURL, 1)
    if(!match) return null;
    if(route.props.subPathProps != null) {
        let subPath = path + route.props.subPathProps
        parser = new Path(subPath)
        let subPathMatch = parser.partialTest(currentURL, 1)
        if(subPathMatch!=null) match = subPathMatch
    }
    return match
}

function renderChildren(props, parentPath)
{
    let hasFoundRoute = false;
    let children = []
    let key= 0;
    React.Children.map(props.children, child => {
        key = key + 1
        if (child.type === Route && !hasFoundRoute) {
            let match = matchRoute(child, props.currentRoute, parentPath)
            if(match)
            {
                hasFoundRoute = true
                children.push(React.cloneElement(child, {key, currentRoute: props.currentRoute, parentPath, routeParams: match}))
            }
        }
        else if (child.type !== Route) {
            return children.push(child)
        }
    })
    return children
}

export class Router extends React.Component {
    render() {
        return <div className={this.props.className} style={this.props.style}>
            {renderChildren(this.props, "")}
        </div>
    }
}

export class Route extends React.Component {

    render() {
        let childrenParentPath =  this.props.parentPath + this.props.path
        let component = this.props.component ? this.props.component : "div"
        let componentProps = this.props.componentProps == undefined ? {} : this.props.componentProps
        let routeParams = this.props.routeParams == undefined ? {} : this.props.routeParams
        componentProps = Object.assign({}, componentProps, routeParams, {
            routeFullPath: childrenParentPath,
            parentPath: childrenParentPath,
            currentRoute: this.props.currentRoute,
            routePath: this.props.path,
        })

        if(componentProps.hasOwnProperty("dangerouslySetInnerHTML")) {
            delete componentProps.dangerouslySetInnerHTML
        }

        return <div className={this.props.className} style={this.props.style}>
                    {React.createElement(component, componentProps, renderChildren(this.props, childrenParentPath))}
               </div>
    }
}
