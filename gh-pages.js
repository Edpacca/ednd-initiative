import * as ghpages from "gh-pages"

ghpages.publish(
    'dist',
    {
        branch: 'gh-pages',
        repo: 'https://github.com/Edpacca/ednd-initiative.git',
        user: {
            name: 'Eddie Pace',
            email: 'eddie@pace.me.uk'
        }
    },
    () => {
        console.log('Edpacca\'s initiative tracker deployed')
    }
)