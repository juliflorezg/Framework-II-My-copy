export default {
    setSuggestions: (context, event) => {
      if (event?.suggestions) {
      
        context.suggestions = [...context.suggestions].concat(event?.suggestions);
      }
    },
    onSuccess: (context, event) => {
      context.errorMessage = null;
    },
    onError: (context, event) => {
      context.errorMessage = event.errorMessage;
    },
  };