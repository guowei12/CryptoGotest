import { ethers } from 'ethers';
import Web3Modal from 'web3modal';

// 配置 Web3Modal
const providerOptions = {
    WalletConnect
  // 这里可以添加不同的钱包提供商，例如 WalletConnect 等
};

let web3Modal;
let provider;
let signer;

export const initWeb3Modal = () => {
  web3Modal = new Web3Modal({
    cacheProvider: false, // 可选：缓存上次使用的提供商
    providerOptions,      // 可选：设置不同的钱包提供商
  });
};

export const connectWallet = async () => {
  try {
    const instance = await web3Modal.connect(); // 打开钱包选择界面
    provider = new ethers.providers.Web3Provider(instance);
    signer = provider.getSigner();
    const address = await signer.getAddress();
    return address; // 返回钱包地址
  } catch (error) {
    console.error('连接钱包失败:', error);
    throw new Error('钱包连接失败');
  }
};

export const disconnectWallet = async () => {
  if (provider?.provider?.disconnect) {
    await provider.provider.disconnect(); // 对某些钱包（如 WalletConnect）断开连接
  }
  web3Modal.clearCachedProvider(); // 清除缓存的提供商
};

export const getProvider = () => provider;
export const getSigner = () => signer;
