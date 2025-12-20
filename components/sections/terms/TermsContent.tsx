"use client";

import { Section, Heading, Text } from "@/components/ui";
import { RevealOnScroll } from "@/components/animation";

interface TermsSectionProps {
  title: string;
  children: React.ReactNode;
}

function TermsSection({ title, children }: TermsSectionProps) {
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

function TermsSubSection({ title, children }: TermsSectionProps) {
  return (
    <div className="mb-6">
      <Heading as="h3" size="sm" className="mb-3">
        {title}
      </Heading>
      <div className="space-y-3 text-foreground-muted">{children}</div>
    </div>
  );
}

function TermsList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 ml-4">
      {items.map((item, index) => (
        <li key={index} className="flex gap-3">
          <span className="text-primary-500 mt-1.5">•</span>
          <Text color="muted">{item}</Text>
        </li>
      ))}
    </ul>
  );
}

export function TermsContent() {
  return (
    <Section spacing="lg">
      <div className="max-w-4xl">
        <RevealOnScroll>
          <Text color="muted" className="mb-12 leading-relaxed">
            These Terms and Conditions govern the rental services provided by
            Dream Drives LLC. By renting a vehicle from Uptown Rent A Car
            LLC, you agree to the following terms and conditions:
          </Text>
        </RevealOnScroll>

        <TermsSection title="1. Rental Eligibility">
          <Text color="muted">
            1.1. The renter must be at least 21 years old and possess a valid
            driving license that is recognized in the UAE. For certain luxury
            vehicles, the minimum age requirement may be higher.
          </Text>
          <Text color="muted">
            1.2. The renter must provide a valid Emirates ID (for residents) or
            passport and visa (for tourists) along with a valid credit card.
          </Text>
        </TermsSection>

        <TermsSection title="2. Rental Period">
          <Text color="muted">
            2.1. The rental period starts at the time and date specified in the
            rental agreement and ends when the vehicle is returned to Uptown
            Rent A Car LLC.
          </Text>
          <Text color="muted">
            2.2. Extensions to the rental period must be approved by Uptown Rent
            A Car LLC in advance, and additional charges may apply.
          </Text>
        </TermsSection>

        <TermsSection title="3. Vehicle Usage">
          <Text color="muted">
            3.1. The vehicle is to be used only within the UAE unless prior
            written consent has been obtained.
          </Text>
          <Text color="muted">
            3.2. The renter is prohibited from using the vehicle for racing,
            off-road driving, towing, or any unlawful activities.
          </Text>
          <Text color="muted">
            3.3. Smoking, carrying hazardous materials, or transporting animals
            in the vehicle is strictly prohibited. Cleaning or damage fees will
            apply if this condition is violated.
          </Text>
        </TermsSection>

        <TermsSection title="4. Fuel Policy">
          <Text color="muted">
            4.1. The vehicle is provided with a specific fuel level and must be
            returned with the same level. Any shortfall in fuel will incur
            additional charges.
          </Text>
          <Text color="muted">
            4.2. Overfilling the fuel tank will not result in any reimbursement.
          </Text>
        </TermsSection>

        <TermsSection title="5. Insurance Coverage">
          <Text color="muted">
            5.1. The vehicle rental includes basic insurance as per UAE laws,
            covering third-party liabilities.
          </Text>
          <Text color="muted">
            5.2. The renter may opt for additional insurance coverage (e.g., CDW
            – Collision Damage Waiver) for an extra fee.
          </Text>
          <Text color="muted">
            5.3. Insurance does not cover damages caused by negligence, driving
            under the influence, or unauthorized use of the vehicle. The renter
            will be liable for such damages.
          </Text>
        </TermsSection>

        <TermsSection title="6. Accidents and Damage">
          <Text color="muted">
            6.1. In the event of an accident, the renter must immediately notify
            Dream Drives LLC and the relevant UAE authorities.
          </Text>
          <Text color="muted">
            6.2. A police report is mandatory for all damages, accidents, or
            theft of the vehicle. Failure to provide a police report may result
            in full liability for repair or replacement costs.
          </Text>
        </TermsSection>

        <TermsSection title="7. Non-Rental Charges">
          <Text color="muted">
            7.1. The renter is responsible for all fines, tolls (Salik), parking
            violations, and any other penalties incurred during the rental
            period.
          </Text>
          <Text color="muted">
            7.2. Administrative fees may apply for the processing of fines and
            penalties.
          </Text>
          <Text color="muted">
            7.3. Any damage or excessive wear and tear to the vehicle beyond
            normal usage will incur additional charges.
          </Text>
        </TermsSection>

        <TermsSection title="8. Refunds">
          <Text color="muted">
            8.1. Refunds will only be processed after a dispute is successfully
            resolved in your favor.
          </Text>
          <Text color="muted">
            8.2. Share your dispute resolution details with Uptown Rent A Car
            LLC for assistance.
          </Text>
        </TermsSection>

        <TermsSection title="9. Cancellation and Refund Policy">
          <Text color="muted">
            9.1. Cancellations made 24 hours prior to the rental period will be
            eligible for a refund, subject to a cancellation fee.
          </Text>
          <Text color="muted">
            9.2. No refunds will be issued for cancellations made less than 24
            hours prior to the rental start time.
          </Text>
        </TermsSection>

        <TermsSection title="10. Payment, Security & Extra Mileage">
          <Text color="muted">
            10.1. Payment Mode: We accept all Credit and Debit Cards for rental
            and non-rental payments. All fees, penalties, and trip charges will
            be automatically deducted from the authorized credit/debit card
            provided during the booking. The client must ensure that the credit
            card information associated with bookings is always up to date and
            that there are sufficient funds available to cover any amount owed.
            Fees and charges incurred by clients are not refundable except in
            the case of fraudulent activities not caused by the clients.
          </Text>
          <Text color="muted">
            10.2. Once you submit your booking, there will be a refundable
            charge of AED 3.67 (or equivalent to US$ 1.00 for credit/debit card
            validation).
          </Text>
          <Text color="muted">
            10.3. Refunds will be processed through the Original Mode of
            Payment. Refund TAT (Turnaround Time) is 7-10 working days in case
            of any disputes or cancellations after confirmation. If a booking is
            cancelled before confirmation, the amount is refunded within 24
            hours.
          </Text>
          <Text color="muted">
            10.4. Clients are solely responsible for all credit card, banking,
            service, cellular, data, or access fees or charges incurred in
            relation to any payment to Dream Drives LLC in terms of
            insufficient funds or the use of any of the services and features.
          </Text>
          <Text color="muted">
            10.5. For all payments taken against a client&apos;s credit card,
            Dream Drives LLC will send a payment confirmation email to the
            registered email address within 48-72 hours of the payment.
          </Text>
          <Text color="muted">
            10.6. Multiple bookings may result in multiple postings to the
            cardholder&apos;s monthly statement. The cardholder must retain a
            copy of transaction records and Merchant policies and rules.
          </Text>
          <Text color="muted">
            10.7. Prepaid cards are not accepted under any circumstances.
          </Text>
          <Text color="muted">
            10.8. With regards to repairing and cleaning fees, clients will be
            responsible for the cost of repair for damage to, or the necessary
            cleaning of, vehicles and property resulting from use of the
            Services under the client&apos;s account beyond normal &quot;wear
            and tear.&quot;
          </Text>
          <Text color="muted">
            10.9. If a repair or cleaning request is verified by Uptown Rent A
            Car LLC at its reasonable discretion, the company reserves the right
            to facilitate payment for the reasonable cost of such repair or
            cleaning using the client&apos;s payment method designated in their
            account. Such amounts are non-refundable.
          </Text>
          <Text color="muted">
            10.10. Clients shall be responsible for taxes (VAT) as applicable,
            any processing fees associated with their use of the Services and
            Vehicle Rental, and any credit card fees and banking transaction
            fees (if applicable).
          </Text>
        </TermsSection>

        <TermsSection title="11. Vehicle Return">
          <Text color="muted">
            11.1. The vehicle must be returned in the same condition it was
            rented, along with all accessories (e.g., GPS devices, child seats)
            provided by Dream Drives LLC.
          </Text>
          <Text color="muted">
            11.2. Late returns will incur additional charges as per the rental
            agreement.
          </Text>
          <TermsSubSection title="11.3. Early Return Policy">
            <Text color="muted" weight="semibold">
              Normal Booking:
            </Text>
            <TermsList
              items={[
                "If the original booking is for 30 days or more and the early return request is made with more than 7 but less than 30 days of usage, the rental rate will be adjusted from monthly to weekly.",
                "If the original booking was for 7 days or more but less than 30 days and the early return request is made within 7 days of rental start, the rental rate will be adjusted from weekly to daily.",
              ]}
            />
            <Text color="muted" weight="semibold" className="mt-4">
              Flexible Lease:
            </Text>
            <TermsList
              items={[
                "1-3 Months Tenure: Charges will revert to regular monthly/weekly/daily rates based on the completed duration.",
                "4-6 Months Tenure: Early return within the same tenure before completion: 1-3 months tenure charges will apply.",
                "7-9 Months Tenure: Early return within the same tenure before completion: 4-6 months charges will apply.",
                "10-12 Months Tenure: Early return within the same tenure before completion: 7-9 months charges will apply.",
              ]}
            />
            <Text color="muted" className="mt-4">
              All discounts will be voided in the case of early return. This
              applies to both normal and flexible lease bookings.
            </Text>
          </TermsSubSection>
        </TermsSection>

        <TermsSection title="12. Liability">
          <Text color="muted">
            12.1. Dream Drives LLC is not liable for any personal items
            left in the vehicle during or after the rental period.
          </Text>
          <Text color="muted">
            12.2. The renter is fully responsible for ensuring the
            vehicle&apos;s safety, including locking the vehicle and keeping the
            keys secure at all times.
          </Text>
        </TermsSection>

        <TermsSection title="13. Network Access and Devices">
          <Text color="muted">
            13.1. Clients are responsible for obtaining the data network access
            necessary to use the Services. Their mobile network&apos;s data and
            messaging rates and fees may apply if clients access or use the
            Services from a wireless-enabled device, and they will be
            responsible for such rates and fees.
          </Text>
          <Text color="muted">
            13.2. Clients are responsible for acquiring and updating compatible
            hardware or devices necessary to access and use the Services and
            Applications and any updates thereto.
          </Text>
          <Text color="muted">
            13.3. Dream Drives LLC does not guarantee that the Services, or
            any portion thereof, will function on any particular hardware or
            devices.
          </Text>
          <Text color="muted">
            13.4. The Services may be subject to malfunctions and delays
            inherent in the use of the Internet and electronic communications.
          </Text>
        </TermsSection>

        <TermsSection title="Insurance and Its Criteria">
          <TermsSubSection title="Comprehensive Insurance">
            <Text color="muted">
              At Dream Drives LLC, all vehicles are provided with
              comprehensive insurance in compliance with UAE law. In the event
              of an accident or damage, it is mandatory for clients to notify
              the police immediately. The vehicle must not be moved unless the
              police issue a report or provide explicit instructions to do so.
              Failure to obtain a valid police report will result in the client
              being fully liable for all costs incurred, as insurance coverage
              will not apply in such cases.
            </Text>
          </TermsSubSection>
          <TermsSubSection title="Green Police Report">
            <Text color="muted">
              If the police report indicates a &apos;Green&apos; status,
              confirming that the client was not at fault, no charges will be
              applied to the client.
            </Text>
          </TermsSubSection>
          <TermsSubSection title="Red Police Report">
            <Text color="muted">
              If the police report is marked &apos;Red&apos;, indicating fault
              on the client&apos;s part, the client will be responsible for
              excess insurance charges. These charges will vary depending on the
              type of car rented and the extent of the damage caused.
            </Text>
          </TermsSubSection>
          <TermsSubSection title="Client Mistake with Red Police Report">
            <Text color="muted">
              In cases where the client&apos;s mistake is confirmed by a
              &apos;Red&apos; police report and additional full insurance
              coverage was not opted for during the rental, the maximum
              liability amount will be charged to the client.
            </Text>
          </TermsSubSection>
          <Text color="muted" className="mt-4 p-4 bg-background-elevated rounded-lg border border-border">
            For enhanced peace of mind, we recommend opting for our additional
            full insurance package at the time of rental, which minimizes
            liability in the event of an accident or damage.
          </Text>
        </TermsSection>

        <TermsSection title="14. Termination of Agreement">
          <Text color="muted">
            14.1. Dream Drives LLC reserves the right to terminate the
            rental agreement at any time if the terms and conditions are
            violated.
          </Text>
        </TermsSection>

        <TermsSection title="15. Governing Law">
          <Text color="muted">
            This Agreement between the client and Dream Drives LLC,
            including any access to or use of the vehicle or services, shall be
            governed by the laws and regulations of the United Arab Emirates and
            shall be applicable to the emirate where the agreement is executed.
          </Text>
        </TermsSection>
      </div>
    </Section>
  );
}
