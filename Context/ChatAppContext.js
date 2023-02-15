import React, { useEffect } from 'react'
import { useRouter } from 'next/router';
import { CheckIfWalletConnected, conectWallet, connectingWithContract } from '@/Utils/apiFeature'


export const ChatAppContext = React.createContext();

export const ChatAppProvider = ({children}) => {
    const [account, setAccount] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [friendLists, setFriendLists] = React.useState([]);
    const [friendMsg, setFriendMsg] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [userLists, setUserLists] = React.useState([]);
    const [error, setError] = React.useState("");


    const [currentUsername, setCurrentUsername] = React.useState("");
    const [currentUserAddress, setCurrentUserAddress] = React.useState("");

    const router = useRouter();

    // fetch data time of page load
    const fetchData = async() => {
        try {
            // get contract
            const contract = await connectingWithContract();
            // get account
            const account = await conectWallet();
            setAccount(account);
            // get user name
            const userName = await contract.getUsername(account);
            setUsername(userName);
            // get friend list
            const friendList = await contract.getMyFriendList();
            setFriendLists(friendList);

            // get user list
            const userList = await contract.getAllAppUser();
            setUserLists(userList);
            
        } catch (error) {
            console.log(error)
            setError("Please install and connect your wallet")
        }
    }

    // create account
    const createAccount = async({name, accountAddress}) => {
        try {
            // if (!username || !accountAddress) {
            //     return setError("Please enter your username or account address");
            // }
            const contract = await connectingWithContract();
            const createAccount = await contract.createAccount(name);
            setLoading(true);
            await createAccount.wait();
            setLoading(false);

        } catch (error) {
            console.log(error)
            setError("Error while creating your account, please try again")
        }
    }

    // add your friend
    const addFriend = async({name, accountAddress}) => {
        try {
            if (!accountAddress || !name) {
                return setError("Please enter your friend address");
            }
            const contract = await connectingWithContract();
            const addFriend = await contract.addFriend(accountAddress, name);
            setLoading(true);
            await addFriend.wait();
            setLoading(false);
            router.push("/");
            window.location.reload();
        } catch (error) {
            setError("Error while adding your friend, please try again")
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    // read message
    const readMessage = async(friendAddress) => {
        try {
            const contract = await connectingWithContract();
            const message = await contract.readMessage(friendAddress);
            console.log(message)
            setFriendMsg(message)
        } catch (error) {
            setError("currently you have no message")
        }
    }

    // send message to your friend
    const sendMessage = async({message, address}) => {
        try {
            // if (!friendAddress || !message) {
            //     return setError("Please enter your friend address");
            // }
            const contract = await connectingWithContract();
            const sendMessage = await contract.sendMessage(address, message);
            setLoading(true);
            await sendMessage.wait();
            setLoading(false);
            window.location.reload();
        } catch (error) {
            console.log(error)
            setError("Error while sending your message, please try again")
        } 
    }

    // read user
    const readUser = async(userAddress) => {
        try {
            const contract = await connectingWithContract();
            const user = await contract.getUsername(userAddress);
            setCurrentUsername(user);
            setCurrentUserAddress(userAddress);
        } catch (error) {
            setError("currently you have no message")
        }
    }

    
    return (
        <ChatAppContext.Provider value={{readMessage, createAccount, addFriend, sendMessage, readUser,conectWallet, CheckIfWalletConnected,
        account, username, friendLists, friendMsg, loading, userLists, error, currentUsername, currentUserAddress
        }}>
            {children}
        </ChatAppContext.Provider>
    )
}

