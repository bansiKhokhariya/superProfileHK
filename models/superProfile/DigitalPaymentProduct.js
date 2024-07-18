
const mongoose = require('mongoose');

const DigitalPaymentProductSchema = new mongoose.Schema({
    digitalFiles: { type: [mongoose.Schema.Types.Mixed] },
    pricingType: { type: String },
    priceInput: { type: String },
    offerDiscountCheckbox: { type: Boolean },
    offerDiscountInput: { type: String },
    minimunInput: { type: String },
    suggestPriceCheckbox: { type: Boolean },
    suggestPriceInput: { type: String },
    limitQuantityCheckBox: { type: Boolean },
    limitQuantityInput: { type: String },
    productPolicyToggle: { type: Boolean },
    productPolicyTextArea: { type: String },
    productPolicyCheckbox: { type: Boolean },
    timePeriodInput: { type: String },
    timePeriodSelect: { type: String },
    pagetitle: { type: String },
    pageCategory: { type: String },
    coverfiles: { type: Object },
    buttonText: { type: String },
    faqsViewToggle: { type: Boolean },
    testimonialsViewToggle: { type: Boolean },
    socialLinksViewToggle: { type: Boolean },
    faqs: { type: Object },
    testimonials: { type: Object },
    socialLinks: { type: Object },
    supportEmail: { type: String },
    supportContact: { type: String },
    customizePageLogo: { type: Object },
    customizePageTitle: { type: String },
    theme: { type: String },
    color: { type: String },
    paymentPagePhone: { type: String },
    paymentPageEmail: { type: String },
    paymentPageName: { type: String },
    paymentEnable: { type: Boolean},
    isDraft: { type: Boolean },
    description: { type: String },
    isPublish: { type: Boolean},
    sale: { type: String },
    revenue: { type: String },
});

const DigitalPaymentProduct = mongoose.models.DigitalPaymentProduct || mongoose.model('DigitalPaymentProduct', DigitalPaymentProductSchema);

export default DigitalPaymentProduct;





