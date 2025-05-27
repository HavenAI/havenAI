import { useEffect , useState} from "react";
import { Keyboard } from "react-native";

export default function useKeyboardVisible(){
    const [keyboardVisible, setkeyboardVisible] = useState(false);

    useEffect(()=>{
        const showSub = Keyboard.addListener('keyboardDidShow',()=> setkeyboardVisible(true));
        const hideSub = Keyboard.addListener('keyboardDidHide',()=> setkeyboardVisible(false));
        return () => {
            showSub.remove();
            hideSub.remove();
        };
    },[]);
    return keyboardVisible;
};