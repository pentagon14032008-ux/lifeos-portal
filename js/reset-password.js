const SUPABASE_URL =
"https://ipmidfvqftdahvdhasoy.supabase.co";

const SUPABASE_KEY =
"sb_publishable_SEQtc6ZDgpDcDTUqqq_Ltw_Yo6_L8cD";

const { createClient } = supabase;

const supabaseClient =
createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

const resetForm =
document.getElementById("resetForm");

resetForm.addEventListener(
    "submit",
    async (e) => {

        e.preventDefault();

        const newPassword =
        document.getElementById(
            "newPassword"
        ).value;

        const { error } =
        await supabaseClient.auth.updateUser({
            password: newPassword
        });

        if(error){
            alert(error.message);
            return;
        }

        alert(
            "Password Updated Successfully"
        );

        window.location.href =
        "index.html";

    }
);