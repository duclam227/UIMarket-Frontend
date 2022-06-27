import { FC, ChangeEvent, useState } from 'react';

import { toast } from 'react-toastify';
import { FormattedMessage, IntlShape, injectIntl } from 'react-intl';

import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { getErrorMessage } from '../../app/util';
import reportAPI from '../../api/report';

interface Props {
  show: boolean;
  onClose: Function;
  reportObjectId: string;
  type: 'product' | 'question' | 'answer' | 'comment';
  intl: IntlShape;
}

const ReportModal: FC<Props> = props => {
  const { show, onClose, type, reportObjectId, intl } = props;

  const reportModalTitle = <FormattedMessage id="ReportModal.reportModalTitle" />;

  const reasonSelectPlaceholder = intl.formatMessage({
    id: 'ReportModal.reasonSelectPlaceholder',
  });
  const productTypeLabel = intl.formatMessage({ id: 'ReportModal.productTypeLabel' });
  const questionTypeLabel = intl.formatMessage({ id: 'ReportModal.questionTypeLabel' });
  const answerTypeLabel = intl.formatMessage({ id: 'ReportModal.answerTypeLabel' });
  const commentTypeLabel = intl.formatMessage({ id: 'ReportModal.commentTypeLabel' });

  const objectionableContentReasonLabel = intl.formatMessage({
    id: 'ReportModal.objectionableContentReasonLabel',
  });
  const copyrightViolationReasonLabel = intl.formatMessage({
    id: 'ReportModal.copyrightViolationReasonLabel',
  });

  const emptyReasonToastLabel = intl.formatMessage({
    id: 'ReportModal.emptyReasonToastLabel',
  });
  const successToastLabel = intl.formatMessage({
    id: 'ReportModal.successToastLabel',
  });

  const closeBtnLabel = <FormattedMessage id="ReportModal.closeBtnLabel" />;
  const sendReportBtnLabel = <FormattedMessage id="ReportModal.sendReportBtnLabel" />;

  const [reportReason, setReportReason] = useState<string | null>(null);
  const reportTypeContent = {
    product: {
      label: productTypeLabel,
      reasons: [
        {
          key: 'objectionableContent',
          label: objectionableContentReasonLabel,
        },
        {
          key: 'copyrightViolation',
          label: copyrightViolationReasonLabel,
        },
      ],
    },
    question: {
      label: questionTypeLabel,
      reasons: [
        {
          key: 'objectionableContent',
          label: objectionableContentReasonLabel,
        },
      ],
    },
    answer: {
      label: answerTypeLabel,
      reasons: [
        {
          key: 'objectionableContent',
          label: objectionableContentReasonLabel,
        },
      ],
    },
    comment: {
      label: commentTypeLabel,
      reasons: [
        {
          key: 'objectionableContent',
          label: objectionableContentReasonLabel,
        },
      ],
    },
  };
  const handleChangeReportReason = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.currentTarget;
    setReportReason(value);
  };

  const closeReport = () => {
    setReportReason(null);
    onClose();
  };

  const handleSubmitReport = async () => {
    if (!reportReason) {
      toast.error(emptyReasonToastLabel);
      return;
    }
    try {
      await reportAPI.submitReport(reportObjectId, reportReason, type);
      toast.success(successToastLabel);
      closeReport();
    } catch (e) {
      toast.error(getErrorMessage(e));
    }
  };

  return (
    <Modal show={show} onHide={() => closeReport()} centered>
      <Form>
        <Modal.Header closeButton>
          <Modal.Title>
            {reportModalTitle} {reportTypeContent[type].label}{' '}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form.Select
              onChange={e => handleChangeReportReason(e)}
              defaultValue="placeholder"
            >
              <option disabled value="placeholder">
                {reasonSelectPlaceholder}
              </option>
              {reportTypeContent[type].reasons.map((reason: any) => (
                <option key={reason.label} value={reason.label}>
                  {reason.label}
                </option>
              ))}
            </Form.Select>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => closeReport()}>
            {closeBtnLabel}
          </Button>
          <Button
            variant="primary"
            onClick={() => handleSubmitReport()}
            disabled={!reportReason}
          >
            {sendReportBtnLabel}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default injectIntl(ReportModal);

// interface ReportInformation {
//   explanation: string;
// }

// ADDITIONAL CODE RESERVED FOR FUTURE IF REPORT NEEDS MORE OPTIONS/INFORMATION
// const schema = Joi.object({
//   explanation: Joi.string().required(),
// });

// ADDITIONAL CODE RESERVED FOR FUTURE IF REPORT NEEDS MORE OPTIONS/INFORMATION
// const {
//   register,
//   handleSubmit,
//   formState: { errors, isValid },
// } = useForm<ReportInformation>({
//   resolver: joiResolver(schema),
//   mode: 'onTouched',
//   defaultValues: {
//     explanation: '',
//   },
// });

// ADDITIONAL CODE RESERVED FOR FUTURE IF REPORT NEEDS MORE OPTIONS/INFORMATION
// const renderReportNote = () => {
//   switch (reportReason) {
//     case 'objectionableContent':
//       return;
//     case 'copyrightViolation':
//       return (
//         <p className="mb-3">
//           We take all copyright concerns seriously. We urge you to first contact the
//           other designer and try to work the issue out. If you believe that a shop owner
//           has violated a copyright you hold, please also leave an email and our support
//           will contact you to review your claim and information.
//         </p>
//       );
//     default:
//       return;
//   }
// };

{
  /* 
// ADDITIONAL CODE RESERVED FOR FUTURE IF REPORT NEEDS MORE OPTIONS/INFORMATION{reportReason && (
              <div className={`mt-3`}>
                {renderReportNote()}
                <Form.Label>
                  Please provide us with more information (required):{' '}
                </Form.Label>
                <Form.Control as="textarea" {...register('explanation')} />
                {errors.explanation && (
                  <Alert variant="danger" className="mt-2">
                    {errors.explanation.message}
                  </Alert>
                )}
              </div>
 */
}
