import * as Yup from 'yup';

export const meetingSchema = Yup.object().shape({
    roomName: Yup.string()
        .required('Room name is required.'),
    meetingNumber: Yup.string()
        .required('Meeting number is required.'),
    meetingPassword: Yup.string()
        .required('Meeting password is required.')
});