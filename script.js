document.addEventListener("DOMContentLoaded", function () {



    const usernameInput = document.getElementById("user-input");
    const searchButton = document.getElementById("search-btn");
    const statsProgressCircle = document.querySelector(".stats-container");
    const easyProgressCircle = document.querySelector(".easy-progress");
    const mediumProgressCircle = document.querySelector(".medium-progress");
    const hardProgressCircle = document.querySelector(".hard-progress");
    const easyLabel = document.querySelector("#easy-label");
    const mediumlabel = document.querySelector("#medium-label");
    const hardlabel = document.querySelector("#hard-label");

    const cardStatsContainer = document.querySelector(".stats-card");


    function validateUsername(username) {
        if (username.trim() === "") {  //trim => remove white space from start and end both
            alert("Username should not be empty");
            return false;
        }
        // const regex = /^[a-zA-Z0-0_-]{1,15}$/; 
        const regex = /^(?=.{1,20}$)(?![_-])(?!.*[_-]{2})[a-zA-Z0-9_-]+(?<![_-])$/;
        const isMatching = regex.test(username); //test username is valid or not
        if (!isMatching) {
            alert("Invalid Username");
        }
        return isMatching;

    }
    //use to fetch user details


    async function fetchUserDetails(username) {
        try {
            searchButton.textContent = "Searching...";
            searchButton.disabled = true;

            // Free API wrapper
            const response = await fetch(`https://leetcode-api-faisalshohag.vercel.app/${username}`);
            if (!response.ok) throw new Error("Unable to fetch user details");

            const parsedData = await response.json();
            console.log(parsedData);

            displayUserDetail(parsedData);
        } catch (error) {
            console.error(error);
            cardStatsContainer.innerHTML = '<p>Unable to fetch user details</p>';
        } finally {
            searchButton.textContent = "Search";
            searchButton.disabled = false;
        }
    }

    //update details of user in circle
    function updateUserDetails(total_try_question, total, label, circle) { //label,circle=kis lebel/circle me change krna h(easy,medium, hard)

        //get percentage of how much solved
        const progressDegree = (total_try_question / total) * 100;

        circle.style.setProperty("--progress-degree", `${progressDegree}% `);
        label.textContent = `${total_try_question}/${total}`;



    }

  //use to display user details
    function displayUserDetail(data) {
        const total_Easy_question = data.totalEasy;
        const total_Medium_question = data.totalMedium;
        const total_hard_question = data.totalHard;

        const Solved_Easy_question = data.easySolved;
        const Solved_Medium_question = data.mediumSolved;
        const Solved_hard_question = data.hardSolved;

        // Update progress circles
        updateUserDetails(Solved_Easy_question, total_Easy_question, easyLabel, easyProgressCircle);
        updateUserDetails(Solved_Medium_question, total_Medium_question, mediumlabel, mediumProgressCircle);
        updateUserDetails(Solved_hard_question, total_hard_question, hardlabel, hardProgressCircle);

        // Update stats cards
        const cardsData = [
            { label: "Total Solved", value: data.totalSolved },
            { label: "Total Easy", value: total_Easy_question },
            { label: "Total Medium", value: total_Medium_question },
            { label: "Total Hard", value: total_hard_question },
        ];



        //updata stats card details

        document.getElementById("card1").textContent =
            `Overall Solved: ${data.totalSolved}`;
        document.getElementById("card2").textContent =
            `Overall Easy Solved: ${data.easySolved}`;
        document.getElementById("card3").textContent =
            `Overall Medium Solved: ${data.mediumSolved}`;
        document.getElementById("card4").textContent =
            `Overall Hard Solved: ${data.hardSolved}`;


    }


    //add event listener on search button
    searchButton.addEventListener("click", function () {
        const username = usernameInput.value;
        console.log("logging is", username);
        if (validateUsername(username)) {
            fetchUserDetails(username);

        }


    });

    // add event listener for Enter key
    usernameInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            const username = usernameInput.value;
            console.log("logging is", username);
            if (validateUsername(username)) {
                fetchUserDetails(username);
            }
        }
    });


});
