import { config } from './config.js'
import { boundCaption, entity2symbol, hasComparators, numL10n, percL10n } from './lib/fmt.js'
import { createApp} from './vendor/vue.js'
import { Service } from './lib/service.js'
import { Indicator } from './lib/indicator.js'
import { Level } from './lib/level.js'
import AlertComponent from './components/alert.js'
import BurnRateComponent from './components/burn-rate.js'
import ErrorBudgetComponent from './components/error-budget.js'
import ExtLink from './components/ext-link.js'
import HelpComponent from './components/help.js'
import SLFractionComponent from './components/sl-fraction.js'
import { setTitle } from './lib/header.js'
import { percent, percentToRatio, toFixed, clamp } from './lib/math.js'

const app = createApp({
    data() {
        const service = new Service('my-service', 'My service description')
        const level = new Level(service, 'consumption')
        service.addLevel(level)
        const sli = new Indicator(level, 'requests', 'latency', 'ms', '', 'lt')
        sli.addNewObjective()
        level.addIndicator(sli)
        return {
            config,
            service,
        }
    },
    watch: {
        title(newTitle) {
            setTitle(document, newTitle)
        },
    },
    components: {
        AlertComponent,
        BurnRateComponent,
        ErrorBudgetComponent,
        ExtLink,
        HelpComponent,
        SLFractionComponent,
    },
    methods: {
        boundCaption,
        entity2symbol,
        hasComparators,
        numL10n,
        percentToRatio,
        percL10n,

        async copy(elementId, label) {
            try {
                var copyText = document.getElementById(elementId).innerText
                await navigator.clipboard.writeText(copyText)
                this.toastCaption = 'Copied to clipboard!'
                trackEvent('copy', 'button', label)
            } catch(err) {
                // ignore
            }
        },
    }
})

app.mount('#app')