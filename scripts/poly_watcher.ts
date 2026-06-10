import axios from 'axios';

/**
 * Script to poll Polymarket CLOB API for large trades from relatively new wallets.
 * API Docs: https://docs.polymarket.us/
 */

const CLOB_API_URL = 'https://clob.polymarket.com';
const MIN_TRADE_USD = 5000;

interface Trade {
    transaction_hash: string;
    owner: string;
    price: number;
    size: number;
    side: string;
    asset_id: string;
    timestamp: string;
}

async function getRecentTrades(): Promise<Trade[]> {
    try {
        const response = await axios.get(`${CLOB_API_URL}/trades`);
        return response.data;
    } catch (error) {
        console.error('Error fetching trades:', error);
        return [];
    }
}

async function watchPolymarket() {
    console.log(`Checking Polymarket for trades > $${MIN_TRADE_USD}...`);
    const trades = await getRecentTrades();
    
    for (const trade of trades) {
        const totalValue = trade.price * trade.size;
        
        if (totalValue >= MIN_TRADE_USD) {
            console.log(`🚨 Major Trade Alert!`);
            console.log(`Wallet: ${trade.owner}`);
            console.log(`Value: $${totalValue.toFixed(2)}`);
            console.log(`Side: ${trade.side}`);
            console.log(`Hash: ${trade.transaction_hash}`);
            console.log('---------------------------');
        }
    }
}

watchPolymarket();
