async function authLogic(user) {
    try {
        const body = {
            email: user.email,
            first_name: user.given_name,
            last_name: user.family_name
        };

        await fetch("http://localhost:5000/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

    } catch (err) {
        console.log(err.message);
    }
}

export default authLogic;