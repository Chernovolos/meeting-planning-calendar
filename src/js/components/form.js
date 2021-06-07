// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 as uuidv4 } from 'uuid';
import * as $ from 'jquery';
import VanillaSelectBox, { getValues } from '../libs/vanillaSelectBox/vanillaSelectBox';
import { daysMapping } from '../services/helper';
import renderEvents from './event';

// eslint-disable-next-line max-len
export default function initializeForm(participants, days, times, participantsSelect, nameSelect, daySelect, timeSelect, api) {
    const form = document.querySelector('.event-form');
    const newEventButton = document.getElementById('newEvent');
    const btnEventCancel = document.getElementById('btnEventCancel');

    newEventButton.addEventListener('click', () => {
        $('#formModal').modal('show');
        $('.toast').toast('hide');
    });
    participants.forEach((participant) => {
        const option = document.createElement('option');
        option.innerHTML = `${participant.name}`;
        option.value = `${participant.id}`;
        participantsSelect.appendChild(option);
    });
    // initialize multiselect
    const box = new VanillaSelectBox('#participants', { placeHolder: 'Select participants' });

    btnEventCancel.addEventListener('click', () => {
        $('#meetingName, #meetingDay, #meetingTime').val('');
        box.empty();
    });

    Object.entries(daysMapping).forEach(([i, day]) => {
        const option = document.createElement('option');
        option.innerHTML = `${day}`;
        option.value = `${i}`;
        daySelect.appendChild(option);
    });

    times.forEach((time) => {
        const option = document.createElement('option');
        option.innerHTML = `${time}:00`;
        option.value = `${time}`;
        timeSelect.appendChild(option);
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const meetingName = nameSelect.value;
        const meetingDay = daySelect.value;
        const meetingTime = timeSelect.value;

        const date = new Date();
        const currentDay = date.getUTCDay();
        const distance = meetingDay - currentDay;
        date.setUTCDate(date.getUTCDate() + distance);
        date.setUTCHours(+meetingTime, 0, 0, 0);
        const eventDate = date.toISOString();
        const eventDate1 = eventDate.slice(0, 19);
        const eventParticipants = getValues('participants');

        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }

        const newEvent = {
            id: uuidv4(),
            name: meetingName,
            members: eventParticipants.map((participant) => +participant),
            date: eventDate1,
        };
        form.classList.add('was-validated');
        if (form.checkValidity()) {
            api.addEvent(newEvent)
                .then((response) => {
                    api.getEvents()
                        .then((data) => {
                            renderEvents(data);
                            $('#meetingName, #meetingDay, #meetingTime').val('');
                            box.empty();
                            $('#formModal').modal('hide');
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                })
                .catch((error) => {
                    $('.toast').toast('show');
                    $('#meetingDay, #meetingTime').val('');
                });
            form.classList.remove('was-validated');
        }
    });
}
