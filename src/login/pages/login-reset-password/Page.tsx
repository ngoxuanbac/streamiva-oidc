import { useI18n } from "@/login/i18n";
import { useKcContext } from "@/login/KcContext";
import { assert } from "tsafe/assert";
import { Template } from "../../components/Template";
import { Form } from "./Form";

export function Page() {
    const { kcContext } = useKcContext();
    assert(kcContext.pageId === "login-reset-password.ftl");

    const { msg } = useI18n();

    return (
        <Template
            displayInfo
            displayMessage={!kcContext.messagesPerField.existsError("username")}
            infoNode={
                <span className="text-sm text-gray-600 dark:text-gray-400">
                    {kcContext.realm.duplicateEmailsAllowed
                        ? msg("emailInstructionUsername")
                        : msg("emailInstruction")}
                </span>
            }
            headerNode={
                <div className="text-center">
                    <p className="text-base text-gray-600 dark:text-gray-400 font-medium">
                        {msg("emailForgotTitle")}
                    </p>
                </div>
            }
        >
            <Form />
        </Template>
    );
}
