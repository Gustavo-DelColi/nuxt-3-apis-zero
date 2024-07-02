export default defineEventHandler((event) => {
    const authHeader = getHeader(event, "Authorization");

    if (!authHeader || authHeader != 'Bearer xyz') {
        return sendError(
            event,
            createError({ statusCode: 401, statusMessage: "Unathorized" })
        );
    }

    return {
        id: 1,
        name: "John Doe",
        email: "jdoe@me.com",
    };
});