import routeManager from './routeManager'
import * as t from './routingActionTypes'

export const goTo = (route) => {
    return function () {
        routeManager.goTo(route);
    }
}

export const goBack = () => {
    return function () {
        routeManager.goBack();
    }
}

export const onRouteWillBlock = (blockMessage) => {
    return {
        type: t.ROUTE_WILL_BLOCK,
        blockMessage
    }
}

export const onRouteWillUnBlock = () => {
    return {
        type: t.ROUTE_WILL_UNBLOCK
    }
}
