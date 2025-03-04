import redis from "redis";
import sendgrid from "@sendgrid/mail";
import { configDotenv } from "dotenv";
configDotenv();

sendgrid.setApiKey(process.env.SENDGRID_API_KEY!);

const client = redis.createClient();
const streamName = "email_otp_notifications";
const groupName = "email_service_group";
const consumerName = "email_consumer_1";

async function createConsumerGroup() {
  try {
    await client.connect();
    await client.xGroupCreate(streamName, groupName, "0", { MKSTREAM: true });
    console.log(`Consumer group '${groupName}' created.`);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes("BUSYGROUP")) {
        console.log(`Consumer group '${groupName}' already exists.`);
      } else {
        console.error("Error creating consumer group:", error);
      }
    } else {
      console.error("Error creating consumer group:", error);
    }
  }
}

async function processMessages() {
  while (true) {
    try {
      const response = await client.xReadGroup(
        groupName,
        consumerName,
        [{ key: streamName, id: ">" }],
        { COUNT: 10, BLOCK: 5000 }
      );

      if (response) {
        for (const stream of response) {
          for (const message of stream.messages) {
            const id = message.id;
            const { email, otp } = message.message;

            console.log(`Processing email: ${email} with OTP: ${otp}`);

            await sendEmail(email, otp);

            await client.xAck(streamName, groupName, id);
          }
        }
      }
    } catch (error) {
      console.error("Error processing messages:", error);
    }
  }
}

async function sendEmail(email: string, otp: string) {
  const msg = {
    to: email,
    from: "harsimranyadu@gmail.com",
    subject: "Your OTP Code",
    text: `Your One-Time Password (OTP) is: ${otp}`,
    html: `<table width="100%" cellpadding="0" cellspacing="0" border="0" style="font-family: 'Poppins', Arial, sans-serif; background-color:#ffffff;">
  <tr>
    <td align="center">
      <table class="content" style="max-width: 380px; width: 100%; padding-bottom:20px" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td>
            <table style="padding: 20px 0; width: 100%;" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding-top: 20px; padding-bottom: 10px; color: black; text-align: center; font-weight: 600; font-size: 24px;">Commitly</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td>
            <table style="padding: 20px 0; width: 100%;" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="font-size: 24px; text-align: center; font-weight: 700; color: #000000; letter-spacing: -0.05rem;">Almost there</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="font-size: 16px; color: #161616; line-height: 1.6; text-align: start; padding-top: 10px;">Here is your code:</td>
        </tr>
        <tr>
          <td>
            <table style="padding: 20px 0; width: 100%;" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="font-size: 22px; font-weight: bold; letter-spacing: 0.2rem; text-align: center;">${otp}</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="font-size: 16px; color: #161616; line-height: 1.6; text-align: start; padding-top: 10px;">
            This code will be active for ten minutes. If you don't make it in time, you can always request a new one.
          </td>
        </tr>
        <tr>
          <td>
            <table style="width: 100%; padding: 20px 0; text-align: center; background-color:#ffffff;">
              <tr>
                <td style="font-size: 16px; color: #161616; line-height: 1.6; text-align: start;">
                  If you weren't expecting this email, someone else may have accidentally entered your email address.
                  Questions? Our friendly
                  <a href="#" style="color: #5667F6; text-decoration: underline;">support team</a> is always happy to help.
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td>
            <table style="width: 100%; padding: 32px 0; text-align: center; border-top: 1px solid #979797; border-bottom: 1px solid #979797; color: #161616;">
              <tr>
                <td style="font-size: 14px;">Keeping you motivated.</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td>
            <table style="width: 100%; padding: 20px 0; text-align: center; background-color:#ffffff;">
              <tr>
                <td style="font-size: 12px; color: #979797; padding: 0 10px;">
                  <a href="#" style="color: #979797; text-decoration: underline;">Help</a>
                </td>
                <td style="font-size: 12px; color: #979797; padding: 0 10px;">
                  <a href="#" style="color: #979797; text-decoration: underline;">About us</a>
                </td>
                <td style="font-size: 12px; color: #979797; padding: 0 10px;">
                  <a href="#" style="color: #979797; text-decoration: underline;">Legal</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`,
  };

  try {
    await sendgrid.send(msg);
    console.log(`✔️ Email sent to ${email}`);
  } catch (error) {
    console.error(`❌ Failed to send email to ${email}:`, error);
  }
}

(async () => {
  await createConsumerGroup();
  await processMessages();
})();
