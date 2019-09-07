const getVoteForm = (baseUrl, question) => ({
    data: {
        metadata: {
            app_name: 'Pollice',
            app_id: 123456,
            title: question.text,
            submit_button: {
                label: 'Submit',
                background_color: '#6666ff',
                cta: 'request',
                url: `${baseUrl}/qr/${question._id}`,
            },
            reset_button: {
                label: 'Clear',
                background_color: '#669999',
            },
            elements: [
                {
                    label: null,
                    type: question.openEnded
                        ? 'input'
                        : question.multiple
                        ? 'checkbox'
                        : 'radio',
                    input_type: question.openEnded ? 'textarea' : 'text',
                    display_type: 'inline',
                    required: true,
                    error: 'Opps! Please try again!',
                    name: question._id,
                    placeholder: question.text,
                    options: question.answers.map(answer => ({
                        label: answer.text,
                        value: answer._id,
                    })),
                },
            ],
        },
    },
})

const getWaitForm = (baseUrl, question) => ({
    data: {
        metadata: {
            app_name: 'Pollice',
            app_id: 123456,
            title: "Please wait for new question",
            submit_button: {
                label: 'Submit',
                background_color: '#6666ff',
                cta: 'request',
                url: `${baseUrl}/qr/${question._id}`,
            },
            elements: [
                {
                    label: 'Wating is happiness!',
                    type: 'web',
                    content: '<html><body><h2>Please wait for new slide!</h2></body></html>'
                },
            ],
        },
    },
})

module.exports = {
    getVoteForm,
    getWaitForm,
}
