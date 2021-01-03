const getCompareFunction = (sortMethod) => {
    switch (sortMethod) {
        case "Name":
            return function (a, b) { return a.project_name > b.project_name ? 1 : -1 }
        case "Participants":
            return function (a, b) { return a.num_participants > b.num_participants ? -1 : 1 }
        case "Bugs":
            return function (a, b) { return a.num_active_bugs > b.num_active_bugs ? -1 : 1 }
        default: {
            console.error("INVALID SORT METHOD", sortMethod);
        }
    }
}

export default getCompareFunction;