import { Accordion } from "@heroui/react";

export default function Hero3() {
    return (
        <Accordion allowsMultipleExpanded className="w-full max-w-7xl mx-auto">
            <Accordion.Item>
                <Accordion.Heading>
                    <Accordion.Trigger>
                        How can I hire a lawyer?
                        <Accordion.Indicator />
                    </Accordion.Trigger>
                </Accordion.Heading>
                <Accordion.Panel>
                    <Accordion.Body>
                        You can browse our list of experienced lawyers, view their profiles,
                        check their specialization and consultation fees, and hire the
                        lawyer that best fits your legal needs.
                    </Accordion.Body>
                </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item>
                <Accordion.Heading>
                    <Accordion.Trigger>
                        What types of legal services are available?
                        <Accordion.Indicator />
                    </Accordion.Trigger>
                </Accordion.Heading>
                <Accordion.Panel>
                    <Accordion.Body>
                        Our platform provides access to lawyers specializing in Criminal
                        Law, Family Law, Corporate Law, Immigration Law, Property Law,
                        Civil Litigation, and many other legal fields.
                    </Accordion.Body>
                </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item>
                <Accordion.Heading>
                    <Accordion.Trigger>
                        How do consultation fees work?
                        <Accordion.Indicator />
                    </Accordion.Trigger>
                </Accordion.Heading>
                <Accordion.Panel>
                    <Accordion.Body>
                        Each lawyer sets their own consultation fee. The fee is displayed
                        on the lawyer's profile, allowing you to compare options and choose
                        a lawyer that matches your budget.
                    </Accordion.Body>
                </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item>
                <Accordion.Heading>
                    <Accordion.Trigger>
                        Is my personal information secure?
                        <Accordion.Indicator />
                    </Accordion.Trigger>
                </Accordion.Heading>
                <Accordion.Panel>
                    <Accordion.Body>
                        Yes. We take privacy and security seriously. Your personal
                        information and legal discussions are handled securely and shared
                        only when necessary to provide legal services.
                    </Accordion.Body>
                </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item>
                <Accordion.Heading>
                    <Accordion.Trigger>
                        Can I view a lawyer's profile before hiring?
                        <Accordion.Indicator />
                    </Accordion.Trigger>
                </Accordion.Heading>
                <Accordion.Panel>
                    <Accordion.Body>
                        Absolutely. You can review each lawyer's profile, including their
                        experience, specialization, biography, and consultation fee before
                        making a hiring decision.
                    </Accordion.Body>
                </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item>
                <Accordion.Heading>
                    <Accordion.Trigger>
                        How do I contact a hired lawyer?
                        <Accordion.Indicator />
                    </Accordion.Trigger>
                </Accordion.Heading>
                <Accordion.Panel>
                    <Accordion.Body>
                        After successfully hiring a lawyer, you will gain access to their
                        contact information and can communicate with them regarding your
                        legal matter.
                    </Accordion.Body>
                </Accordion.Panel>
            </Accordion.Item>
        </Accordion>
    );
}