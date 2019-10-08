import React from 'react';
import axios from 'axios'
import BitcoinChart from './Chart.jsx';
import moment from 'moment';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            coin: 'BTC',
            coins: {BTC: 'Bitcoin', ETH: 'Etherum', XRP: 'Ripple', EOS: 'EOS', LTC: 'Litecoin', 
            BCH: 'Bitcoin Cash', TRX: 'TRON',ETC: 'Etherum Classic', LINK: 'Chainlink', MOF: 'Molecular Future'},
            labels1: [],
            prices1: [],
        }
        this.handleChange = this.handleChange.bind(this);
        this.getPrices = this.getPrices.bind(this);
    }

    componentDidMount() {
        this.getPrices()
    }
    getPrices() {
        axios.get('/coins', {params: {id:this.state.coin}})
            .then(response => {
                const labels = response.data.Data.Data.map(i => moment(new Date(i.time * 1000)).format('l'))
                const prices = response.data.Data.Data.map(i => i.close)
                this.setState({
                    labels1: labels,
                    prices1: prices
                })
            })
            .catch(err => (
                console.log(err)
            ))
    }

    handleChange(event) {
        this.setState({coin: event.target.value}, () => this.getPrices());
    }

    render() {
        return (
            <div>
                <h2>{`Cryptocurrency Price Index`}</h2>
                    <select value={this.state.coin} onChange={this.handleChange}>
                    {Object.keys(this.state.coins).map((coin, index) => {
                        return (
                            <option key={index}>{coin}</option>
                        )
                    })}
                    </select>
                <BitcoinChart coin={this.state.coin} labels={this.state.labels1} prices={this.state.prices1}/>
            </div>
        )
    }
}

export default App;