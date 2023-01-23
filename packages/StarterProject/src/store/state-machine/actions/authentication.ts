export default {
    setUTM: (context, event) => {
        if (event?.user?.utm) {
            context.user.utm = event.user.utm
        }
    },
    setBusinessData: (context, event) => {
        if (event?.user?.businessData) {
            context.user.businessData = event.user.businessData
        }
    },
    onLoading: (context, event) => {
        if (event?.user) {
            context.user = event.user
        }
    },
    onSuccess: (context, event) => {
        if (event.reverse) {
            context.newLink = "/";
        } else {
            context.newLink = null;
        }
        context.errorMessage = null;
    },
    onError: (context, event) => {
        if (event.reverse) {
            context.newLink = null;
        } else {
            context.newLink = "/login";
        }
        context.errorMessage = event.errorMessage;
    },
    setUserData: (context, event) => {
        if (event?.user) {
            context.user = {
                ...context.user,
                ...event.user
            }
        }
    },
    logout: (context, event) => {
        context.user = null
    },
    redirectDefault: (context, event) => {
        event?.utils.Navigation.linkTo(event?.url)
    }
}