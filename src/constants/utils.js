
import {ethers} from 'ethers';

export const truncateAddress = (address) => {
    if (!address) return "No Account";
    const match = address.match(
        /^(0x[a-zA-Z0-9]{2})[a-zA-Z0-9]+([a-zA-Z0-9]{5})$/
    );
    if (!match) return address;
    return `${match[1]}…${match[2]}`;
};

export const toHex = (num) => {
    const val = Number(num);
    return "0x" + val.toString(16);
};

export const weiFromEther = (amount) => {
    return ethers.utils.parseUnits(amount)
}

export const etherFromWei = (amount) => {
    return ethers.utils.formatEther(amount)
}