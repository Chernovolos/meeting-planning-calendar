export const getCalendarMode = () => {
    const membersSelect = document.querySelector('[data-control-name=teamMembers]');
    return membersSelect.value;
};

export const daysMapping = {
    // 0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
};
