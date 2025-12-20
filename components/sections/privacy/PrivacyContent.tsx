"use client";

import { Section, Heading, Text } from "@/components/ui";
import { RevealOnScroll } from "@/components/animation";

interface PolicySectionProps {
  title: string;
  children: React.ReactNode;
}

function PolicySection({ title, children }: PolicySectionProps) {
  return (
    <RevealOnScroll>
      <div className="mb-12">
        <Heading as="h2" size="md" className="mb-4">
          {title}
        </Heading>
        <div className="space-y-4 text-foreground-muted">{children}</div>
      </div>
    </RevealOnScroll>
  );
}

export function PrivacyContent() {
  return (
    <Section spacing="lg">
      <div className="max-w-4xl">
        <RevealOnScroll>
          <Text color="muted" className="mb-12 leading-relaxed">
            Your privacy is important to you and to us. Dream Drives is
            committed to protecting its members, website visitors, and app
            users&apos; privacy. The following Privacy and Cookie Policy
            outlines the information Dream Drives may process and how we
            may use that information to better serve users while using our
            website, mobile application, and services.
          </Text>
          <Text color="muted" className="mb-12 leading-relaxed">
            If you have questions about this Privacy and Cookie Policy, please
            contact us at{" "}
            <a
              href="mailto:info@dreamdrives.com"
              className="text-primary-500 hover:underline"
            >
              info@dreamdrives.com
            </a>
          </Text>
        </RevealOnScroll>

        <PolicySection title="Definitions">
          <Text color="muted">
            <strong>&quot;User&quot;</strong> means a person who has signed up
            and has a booking with Dream Drives for the use or potential
            use of the Service.
          </Text>
        </PolicySection>

        <PolicySection title="1. Optimization of Website & App">
          <Text color="muted">
            When you visit our website, our website administrators process
            technical data such as your IP address, visited web pages, the
            internet browser you use, your previous/next visited websites, and
            the duration of a visit/session to enable us to deliver the best
            functionalities of the website.
          </Text>
          <Text color="muted">
            In addition, in certain instances the browser may prompt you for
            your geo-location to allow us to provide you with an enhanced
            experience. With this technical data our website administrators can
            manage the website, for instance by resolving technical difficulties
            or improving the accessibility of certain parts of the website.
          </Text>
          <Text color="muted">
            When you use our app, we also process technical data such as your IP
            address, Device ID or MAC address, and information about the
            manufacturer, model, and operating system of your mobile device. We
            use this data to enable us to deliver the functionalities of the
            app, resolve technical difficulties, and provide you with the
            correct and most up to date version of the app.
          </Text>
        </PolicySection>

        <PolicySection title="2. Optimization of Customer Service">
          <Text color="muted">
            When you register as a user, we will collect your name, email
            address, country, language, password, mobile phone number, IP
            address, and Device ID.
          </Text>
          <Text color="muted">
            We will use your contact details to send you a welcoming email to
            verify your username and password, to communicate with you in
            response to your inquiries, and to send you service-related
            announcements, for instance, if our service is temporarily suspended
            for maintenance.
          </Text>
          <Text color="muted">
            We will use your registration information to create and manage your
            user account. We may deactivate your account if we suspect that you
            use our app to commit fraudulent or illegal acts or if you violate
            our terms of use.
          </Text>
          <Text color="muted">
            Some of the advertisements you see on the site are selected and
            delivered by third parties, such as ad networks, advertising
            agencies, advertisers, and audience segment providers. These third
            parties may collect information about you and your online
            activities, either on the site or on other websites, through
            cookies, web beacons, and other technologies in an effort to
            understand your interests and deliver to you advertisements that are
            tailored to your interests.
          </Text>
        </PolicySection>

        <PolicySection title="3. Personal Information">
          <Text
            color="muted"
            className="p-4 bg-background-elevated rounded-lg border border-border"
          >
            All Credit/Debit card details and personally identifiable
            information will NOT be stored, sold, shared, rented, or leased to
            any third parties.
          </Text>
          <Text color="muted">
            When you request transportation via your use of the app, the
            website, or the call center, we provide your first name or last name
            to the driver/partner who accepts your request for transportation so
            that the driver may contact and find you for any support that you
            may need.
          </Text>
        </PolicySection>

        <PolicySection title="4. Telephone Number and Push Notifications">
          <Text color="muted">
            If you have made a booking through the website, the app, or the call
            center, from the time that your reservation is created until you
            complete your reservation, our staff will have the ability to
            contact each other via the contact numbers registered on your
            account.
          </Text>
          <Text color="muted">
            During that time and only if you have consented, we will send you
            SMS and reservation info will be available on the app on your mobile
            phone to let you know of your reservation status.
          </Text>
        </PolicySection>

        <PolicySection title="5. Disclosure of Your Details">
          <Text color="muted">
            We may employ third party companies and individuals to facilitate or
            provide the service on our behalf, to process payment, provide
            customer support, provide geo-location information to our drivers,
            to perform website-related services (e.g., maintenance services,
            database management, web analytics and improvement of the website
            and other features) or to assist us in analyzing how our service is
            used.
          </Text>
          <Text color="muted">
            These third parties may have access to your personal information
            only to perform these tasks on our behalf and are contractually
            bound not to disclose or use it for any other purpose.
          </Text>
          <Text color="muted">
            Dream Drives will disclose your personal data to the extent
            that this is legally required, or necessary for the establishment,
            exercise or defense of legal claims and legal process; or in the
            event of an emergency pertaining to your health and/or safety.
          </Text>
          <Text color="muted">
            You may request details of personal information which we hold about
            you under the Data Protection Act. A small fee will be payable. If
            you would like a copy of the information held on you, please write
            to{" "}
            <a
              href="mailto:info@dreamdrives.com"
              className="text-primary-500 hover:underline"
            >
              info@dreamdrives.com
            </a>
          </Text>
          <Text color="muted">
            If you believe that any information we are holding on you is
            incorrect or incomplete, please write to or email us as soon as
            possible. We will promptly correct any information found to be
            incorrect.
          </Text>
        </PolicySection>

        <PolicySection title="6. How We Use Cookies">
          <Text color="muted">
            A cookie is a small file which asks permission to be placed on your
            computer hard drive. Once you agree, the file is added and the
            cookie helps analyze web traffic or lets you know when you visit a
            particular site. Cookies allow web applications to respond to you as
            an individual.
          </Text>
          <Text color="muted">
            We use traffic log cookies to identify which pages are being used.
            This helps us analyze data about web page traffic and improve our
            website in order to tailor it to customer needs. We only use this
            information for statistical analysis purposes and then the data is
            removed from the system.
          </Text>
          <Text color="muted">
            Overall, cookies help us provide you with a better website, by
            enabling us to monitor which pages you find useful and which you do
            not. A cookie in no way gives us access to your computer or any
            information about you, other than the data you choose to share with
            us.
          </Text>
          <Text color="muted">
            You can choose to accept or decline cookies. Most web browsers
            automatically accept cookies, but you can usually modify your
            browser setting to decline cookies if you prefer. This may prevent
            you from taking full advantage of the website.
          </Text>
        </PolicySection>

        <PolicySection title="7. Links to Other Websites">
          <Text color="muted">
            Our website may contain links to other websites of interest.
            However, once you have used these links to leave our site, you
            should note that we do not have any control over that other website.
          </Text>
          <Text color="muted">
            Therefore, we cannot be responsible for the protection and privacy
            of any information which you provide whilst visiting such sites and
            this privacy statement does not govern such sites. You should
            exercise caution and look at the privacy statement applicable to the
            website in question.
          </Text>
        </PolicySection>

        <PolicySection title="8. Changes in This Privacy Policy">
          <Text color="muted">
            We may update this privacy statement to reflect changes to our
            information practices. If we make any material changes we will
            notify you by email and by means of a notice on the website prior to
            the change becoming effective.
          </Text>
          <Text color="muted">
            We encourage you to periodically review this page for the latest
            information on our privacy practices.
          </Text>
        </PolicySection>

        <PolicySection title="9. Contacting Us">
          <Text color="muted">
            If there are any questions regarding this privacy policy you may
            contact us using the information on our{" "}
            <a href="/contact" className="text-primary-500 hover:underline">
              Contact Us
            </a>{" "}
            page.
          </Text>
        </PolicySection>
      </div>
    </Section>
  );
}
