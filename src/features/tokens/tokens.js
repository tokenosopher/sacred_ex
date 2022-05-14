import polygon_token from "../../assets/token_icons/polygon_token.png";
import gratitude_coin from "../../assets/token_icons/gratitude_coin.png";
import gepeto_coin from "../../assets/token_icons/gepeto_coin.png";

//importing the IERC20Interface:
import IERC20Sacred from "../../artifacts/src/contracts/IERC20Sacred.sol/IERC20Sacred.json"

//importing contractAddresses, which was exported as a json file from hardhat when the contract was deployed:
import contractAddresses from "../../artifacts/src/contract_addresses/contractAddresses.json";


let tokens;
export default tokens = [
    {
        id: "1",
        name: "Polygon Matic",
        symbol: "MATIC",
        icon: polygon_token
    },

    {
        id: "2",
        name: "Gratitude Coin",
        symbol: "GRTFUL",
        icon: gratitude_coin,
        guidelineTitle: "Gratitude Coin Guideline",
        guidelines: "Every time you buy, sell or otherwise use the coin, take a second to think of something that you are grateful for. It could be your family, your friends, the neighborhood you are living in or your pet tortoise. Ideally, you should think about something different that you're grateful for every time you use the coin.",
        messageTitle: "Include message of gratitude",
        messageDescription: "Help to inspire gratitude and provide value to the coin by writing what you are grateful for when you trade it.",
        messagePlaceholderOne: "Name",
        messageConnector: "is grateful for",
        messagePlaceholderTwo: "...something"
    },

    {
        id: "3",
        name: "General Peace Token",
        symbol: "GEPETO",
        icon: gepeto_coin,
        guidelineTitle: "General Peace Token Guideline",
        guidelines: "Every time you buy or sell the coin, aim to share a message that you think would inspire peace between communities that are currently in conflict with one another. It can be a personal story that inspires worldwide peace, an inspiring message or a work of art.",
        messageTitle: "Include message of peace",
        messageDescription: "Help to inspire peace and provide value to the coin by writing a message that you think would inspire peace among groups that are in conflict at the moment.",
        messagePlaceholderOne: "Name",
        messageConnector: "'s message of peace is",
        messagePlaceholderTwo: "...something",
        address: contractAddresses.generalPeaceTokenAddress,
        abi: IERC20Sacred.abi,
        exchangeAddress: contractAddresses.exchangeAddress
    }
]