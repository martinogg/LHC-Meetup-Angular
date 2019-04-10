import React, { Component } from 'react';
import { Alert, FlatList, Platform, StyleSheet, View } from 'react-native';
import { NavigationActions, NavigationScreenProp, StackActions } from 'react-navigation'
import {
    Container,
    Header,
    Button,
    Icon,
    Item,
    Input,
    Content,
    Text
} from "native-base";

import FirebaseConnection from '../../Helpers/FirebaseConnection'
import { IUserFromFirebase, User, IUser } from '../../Helpers/UserStruct'
import BrowseUserEntry from '../../Components/BrowseUserEntry/BrowseUserEntry'
import { AppStyles } from '../../AppStyles'
interface IProps {
    navigation: NavigationScreenProp<any, any>,
    screenProps: {
        firebaseConnection: FirebaseConnection
    }
}

interface IState {
    users: IUserFromFirebase[]
    searchText: string
}

export class BrowseScreen extends Component<IProps, IState> {

    constructor(props: IProps) {

        super(props);
        this.state = {
            users: [],
            searchText: ''
        }
    }

    componentDidMount() {

    }

    private onChangeSearchText(text: string) {
        // TODO TEST 
        this.setState({searchText: text})
    }

    private searchButtonPressed() {
        // TODO TEST
        this.props.screenProps.firebaseConnection.searchOtherUsers(this.state.searchText).then((otherUsers) => {

            this.setState({
                users: otherUsers
            })

        }, (error) => {

            Alert.alert('error: ' + error)
        })

    }

    public render() {

        const loadingScreen = this.state.users.length == 0 ? <Text>Loading</Text> : null

        return (
            <Container>
                <Header searchBar rounded>
                    <Item>
                        <Icon active name="search" />
                        <Input placeholder="Search Interest"
                            onChangeText={(text) => this.onChangeSearchText(text)} />
                        <Icon active name="people" />
                    </Item>
                    <Button transparent onPress={() => { this.searchButtonPressed() }}>
                        <Text>Search</Text>
                    </Button>
                </Header>
                <FlatList
                    data={this.state.users}
                    keyExtractor={(item, index) => item.id}
                    renderItem={({ item }) => <BrowseUserEntry user={item.user} onSelected={() => { this.onUserSelected(item) }} />}
                />
            </Container>
        );
    }

    public onUserSelected(user: IUserFromFirebase) {
        // TODO Selected user.
    }
}

const styles = StyleSheet.create({
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});
