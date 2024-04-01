/* eslint-disable quotes */
import { Button, Column, Content, Layout, Logo, Row, Text } from '@/ui/components';
import { useWallet } from '@/ui/utils';

import { useExtensionIsInTab } from '@/ui/features/browser/tabs';
import { useNavigate } from '../MainRoute';

export default function WelcomeScreen() {
  const navigate = useNavigate();
  const wallet = useWallet();
  const isInTab = useExtensionIsInTab();

  return (
    <Layout>
      <Content preset="middle">
        <Column fullX>
          <Row justifyCenter>
            <Logo preset="large" />
          </Row>
          <Column gap="xl" mt="xxl">
            <Text
              text={"Inscribe and store your inscriptions in the world's first Open Source Chrome wallet for Ordinals!"}
              preset="sub"
              textCenter
            />

            <Button
              text="Create new wallet"
              preset="primary"
              onClick={async () => {
                const isBooted = await wallet.isBooted();
                if (isBooted) {
                  navigate('CreateHDWalletScreen', { isImport: false });
                } else {
                  navigate('CreatePasswordScreen', { isNewAccount: true });
                }
              }}
            />
            <Button
              text="I already have a wallet"
              preset="default"
              onClick={async () => {
                const isBooted = await wallet.isBooted();
                if (isBooted) {
                  navigate('CreateHDWalletScreen', { isImport: true });
                } else {
                  navigate('CreatePasswordScreen', { isNewAccount: false });
                }
              }}
            />
            <Button
              text="Connect Keystone"
              preset="default"
              onClick={async () => {
                const isBooted = await wallet.isBooted();
                if (!isInTab) {
                  if (isBooted) {
                    window.open('#/account/create-keystone-wallet');
                  } else {
                    window.open('#/account/create-password?isKeystone=true');
                  }
                  return
                }
                if (isBooted) {
                  navigate('CreateKeystoneWalletScreen');
                } else {
                  navigate('CreatePasswordScreen', { isKeystone: true });
                }
              }}
            />
          </Column>
        </Column>
      </Content>
    </Layout>
  );
}
