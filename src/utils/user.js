import eventBus from '../eventBus'

export function validateEmailDominian(email){

    // Verifica se o email é do domínio fatec.sp.gov.br
    const emailPattern = /^[a-zA-Z0-9._%+-]+@fatec\.sp\.gov\.br$/;
    if (!emailPattern.test(email)) {
      const errorObject = {
        title: "",
        text: "O email precisa ser do domínio @fatec.sp.gov.br"
      };
      eventBus.emit("error", errorObject);
      return 0;
    }

    return 1;
}