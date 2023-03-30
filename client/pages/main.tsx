import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@/components/Button";

const Main = () => {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [userData, setUserData] = useState<any>(null);

    const server = process.env.SERVER_URL;

    useEffect(() => {
        // async function fetchData() {
        //     const response = await fetch(server + "/user");
        //     if (response.status === 200) {
        //         const data = await response.json();
        //         setUserData(data);
        //         setLoggedIn(true);
        //     }
        // }
        // fetchData();
        axios
            .get(server + "/user")
            .then((res) => {
                setUserData(res.data);
                setLoggedIn(true);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleLogout = async () => {
        try {
            const response = await axios.get(server + "/logout");
            if (response.status === 200) {
                setLoggedIn(false);
                setUserData(null);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDebug = () => {
        console.log(userData);
    };

    return (
        <div className="container mx-auto">
            <main className="flex flex-col items-center justify-center min-h-screen py-2">
                {loggedIn ? (
                    <>
                        <h3 className="text-4xl m-2">
                            Welcome, <a>{userData.display_name}</a>!
                        </h3>
                        <Button onClick={handleDebug}>
                            Console Log User Data
                        </Button>
                        <Button onClick={handleLogout}>Logout</Button>
                    </>
                ) : (
                    <span>
                        User is logged out. Get back to <a href="/">Home</a>.
                    </span>
                )}
            </main>
        </div>
    );
};

export default Main;
