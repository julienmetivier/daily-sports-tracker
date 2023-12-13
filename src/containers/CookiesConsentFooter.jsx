import { CookieConsent } from 'react-cookie-consent';

import { COLORS } from 'consts';

const CookiesConsentFooter = () => {
  return ( 
    <CookieConsent
      style={{ background: COLORS.CONTROL}}
      buttonStyle={{ 
        background: COLORS.HIGHLIGHT,
        borderRadius: '0.25rem',
        border: `1px solid ${COLORS.PRIMARY}`,
        padding: '0.5rem 1rem',
        color: COLORS.PRIMARY,
        fontFamily: 'inherit',
        fontSize: '1rem',
      }}
    >
      This website uses cookies to keep track of selected leagues and layout.
    </CookieConsent>
   );
}
 
export default CookiesConsentFooter;