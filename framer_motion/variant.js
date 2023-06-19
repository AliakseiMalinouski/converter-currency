export const appVariants = {
    currency: {
        hidden: {
            opacity: 0
        },
        visible: {
            opacity: 1,
            transition: {
                delay: 0.3,
                duration: 0.7
            }
        },
        exit: {
            opacity: 0
        }
    },
    links: {
        hidden: {
            opacity: 0,
            y: -100
        },
        visible: custom => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.5 * custom,
                duration: 0.5
            }
        })
    },
    title: {
        hidden: {
            opacity: 0,
            x: -500
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                delay: 0.3,
                duration: 0.5
            }
        }
    },
    result: {
        hidden: {
            opacity: 0,
            y: -500
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.1,
                duration: 0.4
            }
        },
        exit: {
            opacity: 0
        }
    }
}