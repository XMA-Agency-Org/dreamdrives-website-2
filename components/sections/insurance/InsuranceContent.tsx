"use client";

import { Section, Heading, Text } from "@/components/ui";
import { RevealOnScroll } from "@/components/animation";
import { Shield, Car, AlertTriangle, Wrench } from "lucide-react";

interface InsuranceSectionProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

function InsuranceSection({ title, children, icon }: InsuranceSectionProps) {
  return (
    <RevealOnScroll>
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          {icon && (
            <div className="p-2 rounded-lg bg-primary-500/10 text-primary-500">
              {icon}
            </div>
          )}
          <Heading as="h2" size="md">
            {title}
          </Heading>
        </div>
        <div className="space-y-4 text-foreground-muted">{children}</div>
      </div>
    </RevealOnScroll>
  );
}

function InsuranceSubSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6 pl-4 border-l-2 border-primary-500/30">
      <Heading as="h3" size="sm" className="mb-3">
        {title}
      </Heading>
      <div className="space-y-3 text-foreground-muted">{children}</div>
    </div>
  );
}

function InsuranceList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="flex gap-3">
          <span className="text-primary-500 mt-1.5">•</span>
          <Text color="muted">{item}</Text>
        </li>
      ))}
    </ul>
  );
}

function HighlightBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4 bg-background-elevated rounded-lg border border-border">
      {children}
    </div>
  );
}

export function InsuranceContent() {
  return (
    <Section spacing="lg">
      <div className="max-w-4xl">
        <RevealOnScroll>
          <Text color="muted" className="mb-8 leading-relaxed">
            Dream Drives LLC offers additional protection products that you
            can purchase along with your rental vehicle. We offer our customers
            Damage Waiver, Supplemental Liability Protection, and Roadside
            Assistance Protection.
          </Text>
          <HighlightBox>
            <Text color="muted">
              Please see below for more information about our insurance and
              protection products and what they cover.
            </Text>
          </HighlightBox>
        </RevealOnScroll>

        <div className="my-12">
          <RevealOnScroll>
            <Heading as="h2" size="lg" className="mb-6">
              Definitions
            </Heading>
            <div className="space-y-4">
              <Text color="muted">
                <strong>Abnormal use:</strong> means that your use of the
                vehicle whilst you are in charge of it doesn&apos;t comply with
                the Road Traffic laws that prevail and/or does not meet with the
                requirements of the Local Rental terms and conditions and/or
                does not meet with the standards of driving that would be
                expected of a reasonable and prudent driver.
              </Text>
              <Text color="muted">
                <strong>Accident Report:</strong> means a full and complete
                signed statement (including any other documents) which records
                all of the facts of an accident or incident as they occurred
                (for example, how the event occurred, the nature of the damage
                to the vehicle, the location where the incident took place, the
                dates and circumstances and any potential witness details).
              </Text>
              <Text color="muted">
                <strong>Collision:</strong> means the impact of the vehicle with
                another fixed or moving body or object.
              </Text>
              <Text color="muted">
                <strong>Excess amount:</strong> is a specified sum of money
                that, provided you have complied with the Local Rental terms and
                conditions and have not committed a breach of any applicable
                laws, is the maximum amount we will charge you for the cost of
                any damage caused to the vehicle as a result of a collision
                during the rental period or its attempted theft; or the loss of
                a vehicle if it is written off because it is irreparable or if
                it is stolen and we do not get it back.
              </Text>
            </div>
          </RevealOnScroll>
        </div>

        <InsuranceSection
          title="Basic Protection (Complimentary)"
          icon={<Shield className="w-5 h-5" />}
        >
          <HighlightBox>
            <Text color="muted" weight="semibold">
              Basic Protection is complimentary insurance included with all
              vehicle rentals.
            </Text>
          </HighlightBox>

          <InsuranceSubSection title="Mandatory Third Party Liability Insurance">
            <Text color="muted">
              We are mandated by the laws of all countries in which we operate
              our vehicle rental services to insure our vehicles against
              liability for the claims or actions of Third Parties. You will be
              covered up to the level legally required by the country in which
              you are renting the vehicle for the consequences others may suffer
              as a direct result of your actions whilst driving the vehicle.
            </Text>
          </InsuranceSubSection>

          <InsuranceSubSection title="What You&apos;re Covered For">
            <InsuranceList
              items={[
                "Bodily injury or death suffered by Third Parties",
                "Property damage sustained by Third Parties and losses and costs arising as a consequence of the damage",
              ]}
            />
          </InsuranceSubSection>

          <InsuranceSubSection title="What Is Excluded">
            <InsuranceList
              items={[
                "Bodily injury or death that you (the driver at the time of the collision) may suffer",
                "Any damage to or loss of your personal property or possessions",
                "Any damage caused to the vehicle",
              ]}
            />
          </InsuranceSubSection>

          <InsuranceSubSection title="How to Notify Us">
            <Text color="muted">
              In circumstances involving Third Parties, it is important that you
              properly complete and sign an Accident Report form which gives us
              all relevant details of both the incident and of the Third Party.
              The Accident Report form should be transmitted to us within 5
              working days of the incident or as soon as you reasonably can.
            </Text>
          </InsuranceSubSection>
        </InsuranceSection>

        <InsuranceSection
          title="Special Protection (Additional Package)"
          icon={<Car className="w-5 h-5" />}
        >
          <Text color="muted" className="mb-6">
            Special Protection is an additional insurance package we offer which
            includes Collision Damage Protection, Theft Protection, Glass/Lights
            and Tyre Protection, and Assistance Plus Protection.
          </Text>

          <InsuranceSubSection title="Collision Damage Protection">
            <Text color="muted">
              Our collision damage protection product limits your financial
              exposure for damage caused to the vehicle whilst it is in your
              care. If you purchase this product and comply with applicable laws
              and the Local Rental terms and conditions, we will pay for the
              cost of damage to the vehicle that exceeds the Excess amount.
            </Text>

            <Text color="muted" weight="semibold" className="mt-4">
              What You&apos;re Protected Against:
            </Text>
            <InsuranceList
              items={[
                "Cost of damage to or repair of the vehicle or its book value if not repairable",
                "Loss of Use whilst the vehicle is being repaired and/or written off",
                "Collision with a fixed or moving object",
                "Acts of vandalism while you are driving or using the vehicle",
                "Damage to glass (including sunroofs), lights, reflectors, or tyres during a collision",
                "Natural Catastrophes as defined under UAE law",
              ]}
            />

            <Text color="muted" weight="semibold" className="mt-4">
              What Is Excluded:
            </Text>
            <InsuranceList
              items={[
                "Damage caused by wilful acts of the driver",
                "Explosion or fire from transporting dangerous goods",
                "Theft or vandalism whilst parked unattended",
                "Damage caused by negligence (e.g., fire from cigarettes)",
                "Loss of or damage to your personal property in the vehicle",
              ]}
            />

            <Text color="muted" weight="semibold" className="mt-4">
              Requirements:
            </Text>
            <InsuranceList
              items={[
                "Purchase the protection",
                "Comply with Local Rental terms and conditions and all applicable laws",
                "Notify us within 4 hours of the incident and provide a complete Accident Report",
              ]}
            />
          </InsuranceSubSection>

          <InsuranceSubSection title="Theft Protection">
            <Text color="muted">
              Our theft protection products limit your financial exposure for
              loss of the vehicle if it is stolen or damaged due to an attempted
              theft or vandalism whilst parked unattended during your rental.
            </Text>

            <Text color="muted" weight="semibold" className="mt-4">
              What You&apos;re Protected Against:
            </Text>
            <InsuranceList
              items={[
                "Cost of damage or repair of the vehicle (if recovered) or the book value if lost",
                "Loss of Use whilst being repaired and/or written off",
                "Theft of the vehicle and accessories following breaking and entering",
                "Attempted theft of the vehicle and accessories",
                "Acts of vandalism whilst stationary and unattended",
                "Damage to glass, lights, reflectors, or tyres as a result of theft or attempted theft",
              ]}
            />

            <Text color="muted" weight="semibold" className="mt-4">
              What Is Excluded:
            </Text>
            <InsuranceList
              items={[
                "Theft or damage due to keys left in the vehicle whilst unattended",
                "Failure to use the anti-theft system appropriately",
                "Failure to return the keys or leaving the vehicle unlocked",
                "Theft of or damage to personal and work-related goods in the vehicle",
              ]}
            />

            <Text color="muted" weight="semibold" className="mt-4">
              Requirements:
            </Text>
            <InsuranceList
              items={[
                "Purchase the product",
                "Comply with Local Rental terms and conditions",
                "Notify the local police immediately and provide us with the police report",
                "Notify us within 4 hours and return the keys",
              ]}
            />
          </InsuranceSubSection>

          <InsuranceSubSection title="Glass, Lights and Tyre Protection">
            <Text color="muted">
              This protection product covers damage to glass (excluding sunroofs
              or panoramic roofs), lights, or tyres in circumstances of normal
              use of the vehicle during your rental.
            </Text>

            <Text color="muted" weight="semibold" className="mt-4">
              What You&apos;re Protected Against:
            </Text>
            <InsuranceList
              items={[
                "Vehicle windscreen, side, or rear windows",
                "Vehicle lenses (reflection of light) and lights",
                "Rear view mirrors (glassware only, not the housing)",
                "Damage to tyres unless from abnormal use",
              ]}
            />

            <Text color="muted" weight="semibold" className="mt-4">
              What Is Excluded:
            </Text>
            <InsuranceList
              items={[
                "Damage due to wilful acts or negligence",
                "Damage to sunroofs or panoramic roofs",
                "Theft, fire, or vandalism",
                "Administration costs for handling damage files",
              ]}
            />
          </InsuranceSubSection>

          <InsuranceSubSection title="Assistance Plus Protection">
            <Text color="muted">
              For the duration of the rental, you have the benefit of a 24/7
              breakdown and assistance service at no extra cost. However,
              certain situations are excluded from the free service and will be
              subject to a flat charge.
            </Text>

            <Text color="muted" weight="semibold" className="mt-4">
              What Assistance Plus Protects Against:
            </Text>
            <InsuranceList
              items={[
                "Fuel failures or errors",
                "Breakage or loss of the vehicle's keys",
                "Punctures and/or deterioration of tyres",
                "Battery failure (discharged battery)",
              ]}
            />

            <Text color="muted" weight="semibold" className="mt-4">
              What Is Excluded:
            </Text>
            <InsuranceList
              items={[
                "Engine breakage due to battery failure or wrong fuel",
                "Administration costs for handling damage files",
              ]}
            />

            <Text color="muted" className="mt-4">
              When one of the covered circumstances happens during your rental,
              contact our Assistance Service at{" "}
              <a
                href="tel:+971545555402"
                className="text-primary-500 hover:underline"
              >
                +971 54 555 5402
              </a>
              .
            </Text>
          </InsuranceSubSection>
        </InsuranceSection>

        <InsuranceSection
          title="Important Information"
          icon={<AlertTriangle className="w-5 h-5" />}
        >
          <HighlightBox>
            <Text color="muted">
              <strong>Without Protection:</strong> If during your rental the
              vehicle is stolen, damaged in an attempted theft, or due to
              vandalism and you have not purchased protection, you will be
              liable for the full cost of the damage or the full book value of
              the vehicle if not recovered, as well as compensation for Loss of
              Use calculated according to the daily rental rate multiplied by
              the number of days the vehicle has been unavailable.
            </Text>
          </HighlightBox>

          <HighlightBox>
            <Text color="muted">
              <strong>With Protection:</strong> Provided you have complied with
              the Local Rental terms and conditions, the maximum you will have
              to pay is the Excess amount. You can reduce or eliminate the
              Excess amount by purchasing our premium or medium protection
              packages.
            </Text>
          </HighlightBox>
        </InsuranceSection>

        <InsuranceSection
          title="Need Assistance?"
          icon={<Wrench className="w-5 h-5" />}
        >
          <Text color="muted">
            For any questions about our insurance and protection products, or to
            add coverage to your rental, please contact our team. We&apos;re
            here to help you choose the right protection for your needs.
          </Text>
        </InsuranceSection>
      </div>
    </Section>
  );
}
