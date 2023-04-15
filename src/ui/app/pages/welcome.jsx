import React from 'react';
import { Button } from '@chakra-ui/button';
import { Backpack } from 'react-kawaii';
import { Checkbox, Image, useColorModeValue } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import {
  Input,
} from '@chakra-ui/input';
import { Box, Spacer, Text, Link } from '@chakra-ui/layout';
import { useDisclosure } from '@chakra-ui/hooks';
import { Select } from '@chakra-ui/select';

import BannerWhite from '../../../assets/img/bannerWhite.svg';
import BannerBlack from '../../../assets/img/bannerBlack.svg';
import TermsOfUse from '../components/termsOfUse';
import { ViewIcon, WarningTwoIcon } from '@chakra-ui/icons';
import { createTab } from '../../../api/extension';
import { TAB } from '../../../config/config';
import { createReadOnlyAccount } from '../../../api/extension';
import { useStoreActions } from 'easy-peasy';

const Welcome = () => {
  const Banner = useColorModeValue(BannerBlack, BannerWhite);
  const [address, setAddress] = React.useState('');
  const [walletName, setWalletName] = React.useState('');
  const history = useHistory();
  const setRoute = useStoreActions(
    (actions) => actions.globalModel.routeStore.setRoute
  );

  return (
    <>
      <Box
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
        position="relative"
      >
        {/* Header */}
        <Box position="absolute" top="9">
          <Image draggable={false} width="85px" src={Banner} />
        </Box>
        {/* Footer */}
        <Box position="absolute" bottom="3" fontSize="xs">
          <Link
            onClick={() => window.open('https://namiwallet.io')}
            color="GrayText"
          >
            namiwallet.io
          </Link>
        </Box>
        <Box h="12" />
        <Text fontWeight="medium" fontSize="3xl">
          Welcome
        </Text>
        <Text
          color="grey"
          fontWeight="light"
          fontSize="sm"
          textAlign="center"
          lineHeight="1.2"
        >
          Let's get started with creating a wallet.
        </Text>
        <Box h="8" />
        <Backpack size={120} mood="blissful" color="#61DDBC" />
        <Box height="8" />
        <Box height="4" />
        <Input
          variant={'filled'}
          onChange={(e) => setWalletName(e.target.value)}
          width={180}
          size={'xs'}
          placeholder={'Wallet Name'}
          rounded='full'
          fontWeight='bold'
        ></Input>
        <Box h="2" />
        <Input
          variant={'filled'}
          onChange={(e) => setAddress(e.target.value)}
          width={180}
          size={'xs'}
          placeholder={'addr1q...'}
          rounded='full'
          fontWeight='bold'
        ></Input>
        <Box h="4" />
        <Button
          onClick={() => {
            createReadOnlyAccount(walletName || address, address).then(() => {
              setRoute('/wallet');
              history.push('/wallet')
            }).catch(console.log)
          }}
          colorScheme="orange"
          size="sm"
        >
          Import Read-only Wallet
        </Button>
      </Box>
    </>
  );
};

export default Welcome;
