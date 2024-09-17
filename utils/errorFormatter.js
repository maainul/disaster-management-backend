export const formatValidationErrors = (error) => {
    const formattedErrors = error.details.map(detail => ({
        label: detail.context.label,
        message: detail.message.replace(/"/g, '')
    }));

    return {
        success: false,
        error: formattedErrors
    };
};
