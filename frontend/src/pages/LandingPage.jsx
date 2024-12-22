import { useLandingVariant } from '../contexts/LandingVariantContext';
import { LANDING_VARIANTS } from '../utils/constants';
import LandingPageMinimal from './landing-variants/LandingPageMinimal';
import LandingPageModern from './landing-variants/LandingPageModern';
import LandingPageFeature from './landing-variants/LandingPageFeature';
import LandingPageCrypto from './landing-variants/LandingPageCrypto';
import LandingPageEnterprise from './landing-variants/LandingPageEnterprise';
import VariantSwitcher from '../components/dev/VariantSwitcher';

const variantComponents = {
    [LANDING_VARIANTS.MINIMAL]: LandingPageMinimal,
    [LANDING_VARIANTS.MODERN]: LandingPageModern,
    [LANDING_VARIANTS.FEATURE]: LandingPageFeature,
    [LANDING_VARIANTS.CRYPTO]: LandingPageCrypto,
    [LANDING_VARIANTS.ENTERPRISE]: LandingPageEnterprise
};

export default function LandingPage() {
    const { currentVariant } = useLandingVariant();
    const VariantComponent = variantComponents[currentVariant];

    return (
        <>
            <VariantComponent />
            <VariantSwitcher />
        </>
    );
}
