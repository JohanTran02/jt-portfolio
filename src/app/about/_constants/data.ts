export type TitleData = {
    title: string,
    values: string[],
}

export const insights: TitleData[] = [
    {
        title: 'Curiosity',
        values: [
            'Question things to gain insight and encourage thinking.',
            'Hold ideas firmly until proven otherwise.',
            'Learn how to memorize effectively.',
            'Own up to your mistakes with grace and understanding.',
            'Be comfortable going outside your comfort zone.'
        ]
    },
    {
        title: 'Empathy',
        values: [`Treat your coworkers with empathy and make them feel heard.`,
            `Understand the intention behind the feedback.`,
            `Be authentic and you will be surrounded by like minded people.`,
            `Don't take actions or behaviors personally.`
        ]
    },
    {
        title: 'Conscientiousness',
        values: [`Define the problem => Solve with essential information.`,
            `Think about your qualities to bring out the most in the team. `,
            `Be the change you want to see.`,
            `Know when it's a marathon or a sprint.`,
            `Intention is the beginning of everything.`
        ]
    }
]