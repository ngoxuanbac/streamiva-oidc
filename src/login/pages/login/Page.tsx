import { assert } from "tsafe/assert";
import { Template } from "../../components/Template";
import { useKcContext } from "../../KcContext";
import { Form } from "./Form";
import { Info } from "./Info";
import { SocialProviders } from "./SocialProviders";
import { useI18n } from "@/login/i18n";

export function Page() {
    const { kcContext } = useKcContext();
    assert(kcContext.pageId === "login.ftl");

    const { msg } = useI18n();

    return (
        <Template
            displayMessage={
                !kcContext.messagesPerField.existsError("username", "password")
            }
            headerNode={
                <div className="text-center">
                    <p className="text-base text-gray-600 dark:text-gray-400 font-medium">
                        {msg("loginAccountTitle")}
                    </p>
                </div>
            }
            displayInfo={
                kcContext.realm.password &&
                kcContext.realm.registrationAllowed &&
                !kcContext.registrationDisabled
            }
            infoNode={<Info />}
            socialProvidersNode={
                kcContext.realm.password &&
                kcContext.social !== undefined && <SocialProviders />
            }
        >
            <Form />
        </Template>
    );
}
