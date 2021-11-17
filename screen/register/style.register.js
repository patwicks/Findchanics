import { StyleSheet } from "react-native";

import Color from "../../config/Color";

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: Color.white,
        alignItems: 'center'
    },
    headerText: {
        fontFamily: 'Poppins-SemiBold',
        textTransform: 'uppercase',
        fontSize: 15,
        color: Color.black
    },
    personalText: {
        textAlign: 'left',
        width: '100%',
        fontSize: 12,
        fontFamily: 'Poppins-Regular',
        color: Color.black
    },
    line:{
        width: '100%',
        borderBottomWidth: 1,
        opacity: 0.1
    },
    // Form Container
    form: {
        // backgroundColor: Color.level4,
        width: '100%',
        padding: 10,
        paddingVertical: 20,
    },
    input: {
        // borderBottomWidth: 1,
        borderWidth: 1,
        borderRadius: 3,
        padding: 5,
        fontSize: 12,
        letterSpacing: 1,
        fontFamily: 'Poppins-Regular',
        borderColor: Color.level3
    },
    pickerContainer: {
        borderWidth: 1,
        borderRadius: 3,
        borderColor: Color.level3,
        marginBottom: 15,
    },
    pickerInput: {
        height: 35
    },
    passContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 10,
        borderWidth: 1,
        borderRadius: 3,
        borderColor: Color.level3,
    },
    inputPass: {
        width: '85%',
        height: '100%',
        fontSize: 12,
        letterSpacing: 1,
        padding: 5,
        fontFamily: 'Poppins-Regular'
    },
    passIcon: {
        color: Color.level2
    },
    // 
    terms: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    termsText: {
        fontSize: 11,
        fontFamily: 'Poppins-Regular',
        color: Color.level2
    },
    termsText2: {
        fontSize: 11,
        fontFamily: 'Poppins-Regular',
        color: Color.secondary,
        textDecorationLine: 'underline'
    },
    btnSignupDisable: {
        opacity: 0.7,
        borderRadius: 3,
        padding: 10,
        height: 50,
        backgroundColor: Color.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    btnSignup: {
        borderRadius: 3,
        padding: 10,
        height: 50,
        backgroundColor: Color.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
        opacity: 1,
    },
    signupText: {
        color: Color.white,
        fontFamily: 'Poppins-SemiBold',
        fontSize: 16,
        textTransform: 'uppercase',
        letterSpacing: 1,
        textAlign: 'center'
    },
    bottom: {
        justifyContent: 'center',
        flexDirection: 'row',
    },
    gotoSignup: {
        color: Color.secondary,
    },
    inputError: {
        color: Color.error,
        fontFamily: 'Poppins-Regular',
        fontSize: 11

    },
    inputServerError: {
        width: '100%',
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#ffe6e6',
        color: Color.error,
        textAlign: 'center',
        fontFamily: 'Poppins-Regular'
    },
})

export default styles