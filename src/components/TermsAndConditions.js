// TermsAndConditions.js
import React from "react";

const TermsAndConditions = () => {
  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h1>Terms and Conditions</h1>

      <section>
        <h2>1. Acceptance of Terms</h2>
        <p>
          By using our hotel booking app, you agree to comply with and be bound
          by these Terms and Conditions, as well as our Privacy Policy. If you
          do not agree with any part of these terms, please do not use the app.
        </p>
      </section>

      <section>
        <h2>2. User Registration and Authentication</h2>
        <p>
          To access our app's services, users must register and authenticate
          using Firebase Authentication. Each user is responsible for the
          accuracy of their account information and maintaining the
          confidentiality of their login credentials.
        </p>
      </section>

      <section>
        <h2>3. Accommodation Listings</h2>
        <ul>
          <li>
            <strong>Display of Listings:</strong> Our app provides information
            on various accommodations, including images, location maps, pricing,
            facilities, policies, and other relevant details.
          </li>
          <li>
            <strong>Accuracy:</strong> We aim to ensure the accuracy of the
            information provided, but we do not guarantee the completeness or
            current status of the accommodation details.
          </li>
          <li>
            <strong>Favourites and Sharing:</strong> Users can save
            accommodations as favorites and share details. Users acknowledge
            that sharing information is done at their discretion.
          </li>
        </ul>
      </section>

      <section>
        <h2>4. Booking and Payments</h2>
        <ul>
          <li>
            <strong>Booking Details:</strong> Users can book accommodations by
            selecting check-in and check-out dates, room type, number of rooms,
            and guests. Bookings are subject to availability and confirmation.
          </li>
          <li>
            <strong>Payment:</strong> Users are required to complete payments
            through an integrated payment gateway. Payment processing is handled
            by third-party providers, and we do not store any payment
            information directly.
          </li>
          <li>
            <strong>Cancellation Policy:</strong> Users must refer to the
            specific cancellation policy associated with each accommodation.
            Fees may apply for cancellations, and refunds are subject to the
            provider's policies.
          </li>
        </ul>
      </section>

      <section>
        <h2>5. User Profile</h2>
        <p>
          Users can view and manage their profiles, bookings, and saved
          accommodations. Users are responsible for keeping their profile
          information accurate and updated.
        </p>
      </section>

      <section>
        <h2>6. Admin Panel</h2>
        <p>Authorized administrators can:</p>
        <ul>
          <li>Add, update, and remove accommodation details.</li>
          <li>Manage and view user reservations.</li>
          <li>Approve, modify, or cancel reservations.</li>
        </ul>
        <p>
          Administrators must comply with the app’s internal policies and
          procedures regarding accommodation and reservation management.
        </p>
      </section>

      <section>
        <h2>7. Data Storage and Management</h2>
        <p>
          We use Firebase Firestore or Firebase Realtime Database to store user,
          accommodation, and booking information. We implement state management
          using Redux to ensure efficient handling of data.
        </p>
      </section>

      <section>
        <h2>8. Reviews and Ratings</h2>
        <p>
          Users can leave reviews and ratings for accommodations they have
          booked. Reviews must be honest and reflect the user's experience. Any
          inappropriate or offensive content will be removed, and we reserve the
          right to suspend or ban users who violate this guideline.
        </p>
      </section>

      <section>
        <h2>9. Notifications</h2>
        <p>
          By using our app, users consent to receive notifications related to
          booking confirmations, updates, promotions, and other important
          information. Users can manage notification preferences through the
          app’s settings.
        </p>
      </section>

      <section>
        <h2>10. Security</h2>
        <p>
          We are committed to protecting user data and transactions with
          appropriate security measures, including secure data storage and
          encrypted transmission. Users are encouraged to report any suspicious
          activity on their accounts.
        </p>
      </section>

      <section>
        <h2>11. Compliance</h2>
        <p>
          We comply with all relevant laws and regulations related to data
          protection, user privacy, and financial transactions. Users
          acknowledge that they are responsible for compliance with any
          applicable local regulations when using our app.
        </p>
      </section>

      <section>
        <h2>12. Scalability and Performance</h2>
        <p>
          The app is designed for scalability to support a growing number of
          users and accommodations. We continually work to optimize performance
          to provide a smooth experience for all users.
        </p>
      </section>

      <section>
        <h2>13. Limitation of Liability</h2>
        <p>
          While we strive to ensure the accuracy of information and availability
          of services, we are not liable for any indirect or consequential loss
          or damage arising from using the app. Users agree that bookings,
          cancellations, or any financial losses incurred are at their own risk.
        </p>
      </section>

      <section>
        <h2>14. Modifications to Terms</h2>
        <p>
          We reserve the right to update or modify these Terms and Conditions at
          any time. Users will be notified of any significant changes, and
          continued use of the app following these changes constitutes
          acceptance of the new terms.
        </p>
      </section>

      <section>
        <h2>15. Contact Us</h2>
        <p>
          For questions or assistance, please contact our support team via
          [support email/contact information].
        </p>
      </section>

      <p>
        <em>
          By registering and using this app, you acknowledge that you have read,
          understood, and agree to these Terms and Conditions.
        </em>
      </p>
    </div>
  );
};

export default TermsAndConditions;
