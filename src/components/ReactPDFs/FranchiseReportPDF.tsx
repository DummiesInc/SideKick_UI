import React, { FC } from 'react';
import {
  Page,
  View,
  Document,
  StyleSheet,
  Image,
  Text,
  Svg,
  Circle
} from '@react-pdf/renderer';
import { FranchiseReportType } from '@/src/utils/Services/FranchiseService';
import fs from 'fs';
import path from 'path';

interface Props {
  franchiseReport: FranchiseReportType | null;
}

const FranchiseReportPDF: FC<Props> = ({ franchiseReport }) => {
  const logoPath = path.resolve('./public/images/franchise-sidekick-logo.png');
  const logoBuffer = fs.readFileSync(logoPath);
  return (
    <Document>
      <Page size="A4">
        <View style={styles.miniLogoWrapper}>
          <View style={styles.miniLogo}>
            <Image src={logoBuffer} />
          </View>
        </View>
        <View style={styles.wrapper}>
          <View style={styles.textWrapper}>
            <Text style={styles.textHeader}>{'Customer name:'}</Text>
            <Text>{franchiseReport?.customerName}</Text>
          </View>
          <View style={styles.textWrapper}>
            <Text style={styles.textHeader}>{'Invest reason:'}</Text>
            <Text>{franchiseReport?.buyInReason}</Text>
          </View>
          <View style={styles.textWrapper}>
            <Text style={styles.textHeader}>{'Goal:'}</Text>
            <Text>{franchiseReport?.vision}</Text>
          </View>
          <View style={styles.textWrapper}>
            <Text style={styles.textHeader}>{'Availability:'}</Text>
            <Text>{franchiseReport?.involvement}</Text>
          </View>
          <View style={styles.textWrapper}>
            <Text style={styles.textHeader}>{'Starting capital:'}</Text>
            <Text>{franchiseReport?.capital}</Text>
          </View>
        </View>

        <View
          style={{
            width: '100% ',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <View style={styles.divider} />
        </View>

        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'flex-start',
            gap: 2,
            marginTop: 10
          }}
        >
          {franchiseReport?.franchises?.map((franchise, i) => {
            return (
              <View
                key={i}
                style={{
                  gap: 4,
                  marginLeft: 20,
                  fontSize: 10,
                  fontWeight: 'thin'
                }}
              >
                <View
                  style={{
                    marginBottom: 10
                  }}
                >
                  <View style={styles.textWrapper}>
                    <Text style={styles.textHeader}>{'Franchise:'}</Text>
                    <Text>{franchise?.name}</Text>
                  </View>

                  <View style={styles.textWrapper}>
                    <Text style={styles.textHeader}>{'Investment Range:'}</Text>
                    <Text>{franchise?.capital?.name}</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </Page>
    </Document>
  );
};

export default FranchiseReportPDF;

const styles = StyleSheet.create({
  miniLogoWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  miniLogo: {
    height: '40px',
    width: '25%',
    marginTop: 30,
    marginBottom: 25,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
    // borderTop: 3, borderBottom: 3, borderLeft: 3,
    // borderRight: 3, borderColor: '#22618F', BorderStyle: 'solid'
  },
  wrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 20,
    flexDirection: 'column',
    gap: 4,
    fontSize: 10,
    fontWeight: 'thin'
  },

  divider: {
    borderTop: 0.5,
    borderColor: '#fd5825',
    backgroundColor: '#fd5825',
    width: '90%',
    marginTop: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  textWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    paddingTop: 2,
    paddingBottom: 1
  },

  textHeader: {
    fontSize: 10,
    fontWeight: 'bold'
  }
});
