 export const authChecker  = ({ context }, roles): boolean => {
    if (!context.user) {
        return false;
    }

    if (roles.length === 0) {
        return true;
    }

    if (context.user.accessLevel > 0 && roles.includes("USER")) {
        return true;
    }

    return context.user.accessLevel > 1 && roles.includes("ADMIN");
};