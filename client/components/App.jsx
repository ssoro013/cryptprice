import React from 'react';
import axios from 'axios';
import moment from 'moment';
import BitcoinChart from './Chart.jsx';
// import MyChart from './MyChart.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coin: 'BTC',
      coins: {
        BTC: 'Bitcoin',
        ETH: 'Etherum',
        XRP: 'Ripple',
        EOS: 'EOS',
        LTC: 'Litecoin',
        BCH: 'Bitcoin Cash',
        TRX: 'TRON',
        ETC: 'Etherum Classic',
        LINK: 'Chainlink',
        MOF: 'Molecular Future',
      },
      labels1: [],
      prices1: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.getPrices = this.getPrices.bind(this);
  }

  componentDidMount() {
    this.getPrices();
  }

  getPrices() {
    const { coin } = this.state;
    axios
      .get('/coins', { params: { id: coin } })
      .then(response => {
        const labels = response.data.Data.Data.map(i =>
          moment(new Date(i.time * 1000)).format('l'),
        );
        const prices = response.data.Data.Data.map(i => i.close);
        this.setState({
          labels1: labels,
          prices1: prices,
        });
      })
      .catch(err => console.log(err));
  }

  handleChange(event) {
    this.setState({ coin: event.target.value }, () => this.getPrices());
  }

  render() {
    const { coin, coins, labels1, prices1 } = this.state;
    const menu = Object.keys(coins).map(item => {
      return <option key={item}>{item}</option>;
    });
    return (
      <div>
        <h2>Cryptocurrency Price Index</h2>
        <select value={coin} onChange={this.handleChange}>
          {menu};
        </select>
        <BitcoinChart coin={coin} labels={labels1} prices={prices1} />
        {/* <MyChart /> */}
      </div>
    );
  }
}

export default App;
