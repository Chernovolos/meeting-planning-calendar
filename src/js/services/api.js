import membersMock from '../mocks/members';
import eventsMock from '../mocks/events';

const SERVER_TEAM_MEMBERS = 'SERVER_TEAM_MEMBERS';
const SERVER_TEAM_EVENTS = 'SERVER_TEAM_EVENTS';

class API {
    constructor() {
        if (localStorage.getItem(SERVER_TEAM_MEMBERS) === null) {
            const membersString = JSON.stringify(membersMock);
            localStorage.setItem(SERVER_TEAM_MEMBERS, membersString);
        }
        if (localStorage.getItem(SERVER_TEAM_EVENTS) === null) {
            const eventsString = JSON.stringify(eventsMock);
            localStorage.setItem(SERVER_TEAM_EVENTS, eventsString);
        }
    }

    importDefaultEvents = () => new Promise((resolve) => {
        setTimeout(() => {
            const eventsString = JSON.stringify(eventsMock);
            localStorage.setItem(SERVER_TEAM_EVENTS, eventsString);
            resolve('OK');
        }, 500);
    });

    getMembers = () => new Promise((resolve, reject) => {
        setTimeout(() => {
            const items = localStorage.getItem(SERVER_TEAM_MEMBERS);
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
            const items = localStorage.getItem(SERVER_TEAM_EVENTS);
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

    deleteEvent = (eventId, memberId) => new Promise((resolve, reject) => {
        setTimeout(() => {
            const items = JSON.parse(localStorage.getItem(SERVER_TEAM_EVENTS));
            // console.log(eventId, memberId);
            if (items != null) {
                let newArray;
                let removedEvent = null;
                if (memberId === 'SELECT_ALL') {
                    newArray = items.filter((event) => event.id !== eventId);
                } else {
                    // eslint-disable-next-line array-callback-return
                    newArray = items.map((event) => {
                        // eslint-disable-next-line radix
                        const memberIdNumber = Number.parseInt(memberId);
                        if (event.id === eventId) {
                            console.log(event.id, eventId, memberIdNumber);
                            // eslint-disable-next-line no-param-reassign,max-len
                            event.members = event.members.filter((member) => member !== memberIdNumber);
                        }
                        removedEvent = event;

                        return removedEvent;
                    });
                }
                const resultArray = newArray.filter((event) => event.members.length !== 0);
                const eventsString = JSON.stringify(resultArray);
                localStorage.setItem(SERVER_TEAM_EVENTS, eventsString);
                resolve(removedEvent);
            } else {
                const error = {
                    status: 400,
                    message: 'Service unavailable. Try to reload the page.',
                };
                reject(error);
            }
        }, 500);
    })

    getEventsById = (id) => new Promise((resolve, reject) => {
        setTimeout(() => {
            const items = localStorage.getItem(SERVER_TEAM_EVENTS);
            if (items != null) {
                const teamEvents = JSON.parse(items);
                const newArray = teamEvents.filter((item) => item.members.indexOf(+id) !== -1);
                resolve(newArray);
            } else {
                const error = {
                    status: 400,
                    message: 'Service unavailable. Try to reload the page.',
                };
                reject(error);
            }
        }, 500);
    });

    addEvent = (newEvent) => new Promise((resolve, reject) => {
        setTimeout(() => {
            const items = localStorage.getItem('SERVER_TEAM_EVENTS');
            let responseError = false;
            if (items != null) {
                const teamEvents = JSON.parse(items);
                teamEvents.forEach((teamEvent) => {
                    // eslint-disable-next-line array-callback-return
                    const teamEventDate = new Date(teamEvent.date);
                    const teamEventDay = teamEventDate.getDay();
                    const teamEventHours = teamEventDate.getHours();

                    const newEventDate = new Date(newEvent.date);
                    const newEventDay = newEventDate.getDay();
                    const newEventHours = newEventDate.getHours();

                    // eslint-disable-next-line max-len
                    if (teamEventDay === newEventDay && teamEventHours === newEventHours) {
                        responseError = true;
                        reject(responseError);
                    }

                    // eslint-disable-next-line max-len
                    if (responseError === false && teamEventDay !== newEventDay && teamEventHours !== newEventHours) {
                        const newArray = [newEvent, ...teamEvents];
                        const eventsString = JSON.stringify(newArray);
                        localStorage.setItem(SERVER_TEAM_EVENTS, eventsString);
                        resolve(newEvent);
                    }
                });
            } else {
                const error = {
                    status: 400,
                    message: 'Service unavailable. Try to reload the page.',
                };
                reject(error);
            }
        }, 500);
    })
}

export default API;
