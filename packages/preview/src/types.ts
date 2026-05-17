// Reference docs:
// https://developer.apple.com/library/archive/documentation/UserExperience/Reference/PassKit_Bundle/Chapters/Introduction.html#//apple_ref/doc/uid/TP40012026
export type PassType = "storeCard" | "eventTicket" | "boardingPass" | "coupon" | "generic";
export type FieldType =
  | "primaryFields"
  | "secondaryFields"
  | "auxiliaryFields"
  | "backFields"
  | "headerFields";
interface Location {
  // Altitude, in meters, of the location.
  altitude?: number;
  // Latitude, in degrees, of the location.
  latitude: number;
  // Longitude, in degrees, of the location.
  longitude: number;
  // Text displayed on the lock screen when the pass is currently relevant. For example, a description of the nearby location such as “Store nearby on 1st and Main.”
  relevantText?: string;
}
interface Beacon {
  // Major identifier of a Bluetooth Low Energy location beacon.
  major?: number;
  // Minor identifier of a Bluetooth Low Energy location beacon.
  minor?: number;
  // Unique identifier of a Bluetooth Low Energy location beacon.
  proximityUUID: string;
  // Text displayed on the lock screen when the pass is currently relevant. For example, a description of the nearby location such as “Store nearby on 1st and Main.”
  relevantText?: string;
}

export enum BarcodeFormat {
  PKBarcodeFormatQR = "PKBarcodeFormatQR",
  PKBarcodeFormatPDF417 = "PKBarcodeFormatPDF417",
  PKBarcodeFormatAztec = "PKBarcodeFormatAztec",
  PKBarcodeFormatCode128 = "PKBarcodeFormatCode128",
}
export interface Barcode {
  // Text displayed near the barcode. For example, a human-readable version of the barcode data in case the barcode doesn’t scan.
  altText?: string;
  // Barcode format.
  format: BarcodeFormat;
  // Message or payload to be displayed as a barcode.
  message: string;
  // Text encoding that is used to convert the message from the string representation to a data representation to render the barcode. The value is typically iso-8859-1, but you may use another encoding that is supported by your barcode scanning infrastructure.
  messageEncoding: string;
}
interface NFC {
  message: string;
  encryptionPublicKey?: string;
}

export enum PassTransitType {
  PKTransitTypeAir = "PKTransitTypeAir",
  PKTransitTypeBoat = "PKTransitTypeBoat",
  PKTransitTypeBus = "PKTransitTypeBus",
  PKTransitTypeGeneric = "PKTransitTypeGeneric",
  PKTransitTypeTrain = "PKTransitTypeTrain",
}
export enum PKTextAlignment {
  PKTextAlignmentLeft = "PKTextAlignmentLeft",
  PKTextAlignmentCenter = "PKTextAlignmentCenter",
  PKTextAlignmentRight = "PKTextAlignmentRight",
  PKTextAlignmentNatural = "PKTextAlignmentNatural",
}

// Number styles have the same meaning as the Cocoa number formatter styles with corresponding names.
// For more information, see https://developer.apple.com/documentation/foundation/nsnumberformatterstyle
export enum PKNumberStyle {
  PKNumberStyleDecimal = 0,
  PKNumberStylePercent = 1,
  PKNumberStyleScientific = 2,
  PKNumberStyleSpellOut = 3,
}

// Date and time styles
// Corresponding formatter style
export enum PKDateStyle {
  PKDateStyleNone = "PKDateStyleNone", // NSDateFormatterNoStyle
  PKDateStyleShort = "PKDateStyleShort", // NSDateFormatterShortStyle
  PKDateStyleMedium = "PKDateStyleMedium", // NSDateFormatterMediumStyle
  PKDateStyleLong = "PKDateStyleLong", // NSDateFormatterLongStyle
  PKDateStyleFull = "PKDateStyleFull", // NSDateFormatterFullStyle
}

export enum PKDataDetectorType {
  PKDataDetectorTypePhoneNumber = "PKDataDetectorTypePhoneNumber",
  PKDataDetectorTypeLink = "PKDataDetectorTypeLink",
  PKDataDetectorTypeAddress = "PKDataDetectorTypeAddress",
  PKDataDetectorTypeCalendarEvent = "PKDataDetectorTypeCalendarEvent",
}
export interface PassField {
  // The key must be unique within the scope of the entire pass. For example, “departure-gate.”
  key: string;
  // Value of the field, for example, 42.
  value: string | number;
  // Label text for the field.
  label?: string;
  // Attributed value of the field.
  // The value may contain HTML markup for links. Only the <a> tag and its href attribute are supported. For example, the following is key-value pair specifies a link with the text “Edit my profile”:
  // "attributedValue": "<a href='http://example.com/customers/123'>Edit my profile</a>"
  // This key’s value overrides the text specified by the value key.
  attributedValue?: string;
  // Alignment for the field’s contents.
  // The default value is natural alignment, which aligns the text appropriately based on its script direction.
  // This key is not allowed for primary fields or back fields.
  textAlignment?: PKTextAlignment;
  // Format string for the alert text that is displayed when the pass is updated. The format string must contain the escape %@, which is replaced with the field’s new value. For example, “Gate changed to %@.”
  // If you don’t specify a change message, the user isn’t notified when the field changes.
  changeMessage?: string;

  // Data detectors that are applied to the field’s value.
  // The default value is all data detectors. Provide an empty array to use no data detectors.
  // Data detectors are applied only to back fields.
  dataDetectorTypes?: PKDataDetectorType[];

  // Date Style Keys: Information about how a date should be displayed in a field.
  // If any of these keys is present, the value of the field is treated as a date. Either specify both a date style and a time style, or neither.
  // Style of date to display.
  dateStyle?: PKDateStyle;
  // Style of time to display.
  timeStyle?: PKDateStyle;
  // Always display the time and date in the given time zone, not in the user’s current time zone. The default value is false.
  // The format for a date and time always requires a time zone, even if it will be ignored. For backward compatibility with iOS 6, provide an appropriate time zone, so that the information is displayed meaningfully even without ignoring time zones.
  // This key does not affect how relevance is calculated.
  ignoresTimeZone?: boolean;
  // If true, the label’s value is displayed as a relative date; otherwise, it is displayed as an absolute date.
  isRelative?: boolean;

  // Number Style Keys: Information about how a number should be displayed in a field.
  // These keys are optional if the field’s value is a number; otherwise they are not allowed. Only one of these keys is allowed per field.
  // ISO 4217 currency code for the field’s value.
  currencyCode?: string;
  // Style of number to display.
  numberStyle?: PKNumberStyle;
}
export interface PassStructure {
  // Additional fields to be displayed on the front of the pass.
  auxiliaryFields?: PassField[];
  // Fields to be on the back of the pass.
  backFields?: PassField[];
  // Fields to be displayed in the header on the front of the pass.
  // Use header fields sparingly; unlike all other fields, they remain visible when a stack of passes are displayed.
  headerFields?: PassField[];
  // Fields to be displayed prominently on the front of the pass.
  primaryFields?: PassField[];
  // Fields to be displayed on the front of the pass.
  secondaryFields?: PassField[];
  // Required for boarding passes; otherwise not allowed. Type of transit.
  transitType?: PassTransitType;
}
export interface PassData {
  // Brief description of the pass, used by the iOS accessibility technologies.
  // Don’t try to include all of the data on the pass in its description, just include enough detail to distinguish passes of the same type.
  description: string;
  // Version of the file format.
  formatVersion: number;
  // Display name of the organization that originated and signed the pass.
  organizationName: string;
  // // Pass type identifier, as issued by Apple. The value must correspond with your signing certificate.
  // passTypeIdentifier: string;
  // // Serial number that uniquely identifies the pass. No two passes with the same pass type identifier may have the same serial number.
  // serialNumber: string;
  // // Team identifier of the organization that originated and signed the pass, as issued by Apple.
  // teamIdentifier: string;

  //Associated App Keys
  // A URL to be passed to the associated app when launching it.
  // The app receives this URL in the application:didFinishLaunchingWithOptions: and application:openURL:options: methods of its app delegate.
  // If this key is present, the associatedStoreIdentifiers key must also be present.
  appLaunchURL?: string;
  // A list of iTunes Store item identifiers for the associated apps.
  // Only one item in the list is used—the first item identifier for an app compatible with the current device. If the app is not installed, the link opens the App Store and shows the app. If the app is already installed, the link launches the app.
  associatedStoreIdentifiers?: number[];

  // Custom information for companion apps. This data is not displayed to the user.
  // For example, a pass for a cafe could include information about the user’s favorite drink and sandwich in a machine-readable form for the companion app to read, making it easy to place an order for “the usual” from the app.
  userInfo?: any;

  // Expiration Keys
  // Date and time when the pass expires.
  // The value must be a complete date with hours and minutes, and may optionally include seconds.
  expirationDate?: string;
  // Indicates that the pass is void—for example, a one time use coupon that has been redeemed. The default value is false.
  voided?: boolean;

  // Relevance Keys
  // Beacons marking locations where the pass is relevant.
  beacons?: Beacon[];
  // Locations where the pass is relevant. For example, the location of your store.
  locations?: Location[];
  // Maximum distance in meters from a relevant latitude and longitude that the pass is relevant.
  maxDistance?: number;
  // Recommended for event tickets and boarding passes; otherwise optional.
  // Date and time when the pass becomes relevant. For example, the start time of a movie.
  relevantDate?: string;

  // Style Keys
  boardingPass?: PassStructure;
  coupon?: PassStructure;
  eventTicket?: PassStructure;
  generic?: PassStructure;
  storeCard?: PassStructure;

  //  Visual Appearance Keys
  // Information specific to the pass’s barcode. For this dictionary’s keys, see Barcode Dictionary Keys.
  // Note:Deprecated in iOS 9.0 and later; use barcodes instead.
  barcode?: Barcode;
  // Information specific to the pass’s barcode. The system uses the first valid barcode dictionary in the array. Additional dictionaries can be added as fallbacks.
  barcodes?: Barcode[];
  // Background color of the pass
  backgroundColor?: string;
  // Foreground color of the pass
  foregroundColor?: string;
  // Color of the label text
  // If omitted, the label color is determined automatically.
  labelColor?: string;
  // Optional for event tickets and boarding passes; otherwise not allowed. Identifier used to group related passes. If a grouping identifier is specified, passes with the same style, pass type identifier, and grouping identifier are displayed as a group. Otherwise, passes are grouped automatically.
  // Use this to group passes that are tightly related, such as the boarding passes for different connections of the same trip.
  groupingIdentifier?: string;
  // Text displayed next to the logo on the pass.
  logoText?: string;
  // // If true, the strip image is displayed without a shine effect. The default value prior to iOS 7.0 is false.
  // // In iOS 7.0, a shine effect is never applied, and this key is deprecated.
  // suppressStripShine?: boolean;

  // Web Service Keys - overriden in distribution
  authenticationToken?: string;
  webServiceURL?: string;

  // NFC-Enabled Pass Keys
  nfc?: NFC;
}

export type PassFiles = { [key: string]: string | null };
