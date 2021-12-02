import React, {useEffect, useState} from 'react';
import {Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MyText} from '../../../core/text';
import {COLORS} from '../../../colors';
import {WebpayPlus} from 'transbank-sdk';
import {TextInputStandard} from '../../../core/textInput';
import {ScrollView} from 'react-native-gesture-handler';
import {ButtonStandard} from '../../../core/button';

interface FieldProps {
  name?: string;
  value?: string;
}

const Field = (props: FieldProps) => {
  return (
    <View
      style={{
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <MyText style={[styles.field]}>{props.name}</MyText>
      <MyText>{props.value}</MyText>
    </View>
  );
};

export const Payment = ({navigation}: any) => {
  async function initPayment() {
    WebpayPlus.commerceCode = '597055555532';
    WebpayPlus.apiKey =
      '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C';
    WebpayPlus.environment = Environment.Integration;
  }

  useEffect(() => {
    initPayment();
  }, []);

  const [token, setToken] = useState('');
  const [status, setStatus] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [transactionStatus, setTransactionStatus]: any = useState([]);
  const Environment = require('transbank-sdk').Environment;

  async function makeTransaction() {
    const sessionId = 'mi-id-de-sesion';
    const buyOrder = Math.round(Math.random() * 999999999).toString();
    const returnUrl = 'https://callback/resultado/de/transaccion';
    var finalUrl = 'https://callback/final/post/comprobante/webpay';
    const response = await WebpayPlus.Transaction.create(
      buyOrder,
      sessionId,
      10,
      returnUrl,
    );
    console.log(response, 'Response');
    setToken(response.token);
    setStatus(true);
    Linking.openURL(response.url);
  }

  async function checkTransaction() {
    const response = await WebpayPlus.Transaction.status(token)
      .then(response => {
        //console.log(response, 'MAIN RESP');
        setTransactionStatus(response);
        const output = response.detailOutput[0];
        console.log(output, 'Status output');
        if (output.responseCode === 0) {
          // La transacción se ha realizado correctamente
        }
      })
      .catch(error => {
        console.log(error.toString());
        // Cualquier error durante la transacción será recibido acá
      });
    //console.log(response, 'Status');
    setShowDetails(true);
  }

  return (
    <SafeAreaView style={styles.main}>
      <View style={{width: '90%', marginBottom: 40}}>
        <MyText style={[styles.title, {fontSize: 20}]}>Payment</MyText>
      </View>
      <ScrollView style={{width: '100%'}}>
        <View style={{width: '100%', alignItems: 'center'}}>
          {showDetails && (
            <View style={{width: '90%'}}>
              <View style={styles.card}>
                <Field name="Amount" value={transactionStatus.amount} />
                <Field name="Buy Order" value={transactionStatus.buy_order} />
                <Field
                  name="Accounting Date"
                  value={transactionStatus.accounting_date}
                />
                <Field name="Status" value={transactionStatus.status} />
                <Field
                  name="Transaction Date"
                  value={transactionStatus.transaction_date}
                />
              </View>
            </View>
          )}
        </View>
      </ScrollView>
      <View style={{width: '90%'}}>
        {status && (
          <ButtonStandard
            title="See Transaction Status"
            onPress={checkTransaction}
            secondary
          />
        )}
        <ButtonStandard title="Pay via Transbank" onPress={makeTransaction} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
  },
  title: {
    letterSpacing: -1,
    fontWeight: 'bold',
    fontSize: 18,
  },
  card: {
    //borderWidth: 1,
    padding: 20,
    marginVertical: 10,
    elevation: 2,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: {height: 1, width: 1}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  field: {
    letterSpacing: -1,
    fontWeight: 'bold',
  },
});
