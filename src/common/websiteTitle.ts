import { changeFavicon, changeTitle } from './title'
const changeWebsite = (merchantNum: string) => {
    // CP2024090278901
    if (merchantNum == "CP2024090278901") {
        changeTitle('AEON Checkout')
        changeFavicon('https://aeon.xyz/logo.png')
    }
}
export default {
    changeWebsite
};