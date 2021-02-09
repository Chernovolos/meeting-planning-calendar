class API {
    constructor(membersList, eventsList) {
        if (localStorage.getItem('SERVER_TEAM_MEMBERS') === null) {
            const TEAM_MEMBERS = JSON.stringify(membersList);
            localStorage.setItem('SERVER_TEAM_MEMBERS', TEAM_MEMBERS);
        }
        if (localStorage.getItem('SERVER_TEAM_EVENTS') === null) {
            const TEAM_EVENTS = JSON.stringify(eventsList);
            localStorage.setItem('SERVER_TEAM_EVENTS', TEAM_EVENTS);
        }
    }

    getMembers = () => new Promise((resolve, reject) => {
        setTimeout(() => {
            const items = localStorage.getItem('SERVER_TEAM_MEMBERS');
            if (items != null) {
                const teamMembers = JSON.parse(items);
                resolve(teamMembers);
            } else {
                console.error('SERVER_TEAM_MEMBERS not found in localStorage, please restart the app');
                const error = {
                    status: 400,
                    message: 'Service unavailable. Try to reload the page.',
                };
                reject(error);
            }
        }, 500);
    });

    getEvents = () => new Promise((resolve, reject) => {
        setTimeout(() => {
            const items = localStorage.getItem('SERVER_TEAM_EVENTS');
            if (items != null) {
                const teamEvents = JSON.parse(items);
                resolve(teamEvents);
            } else {
                const error = {
                    status: 400,
                    message: 'Service unavailable. Try to reload the page.',
                };
                reject(error);
            }
        }, 500);
    });
}

export default API;
