import { FC, ChangeEvent, useState } from 'react';

import { toast } from 'react-toastify';

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
}

const ReportModal: FC<Props> = props => {
  const { show, onClose, type, reportObjectId } = props;
  const [reportReason, setReportReason] = useState<string | null>(null);
  const reportTypeContent = {
    product: {
      label: 'Product',
      reasons: [
        {
          key: 'objectionableContent',
          label: 'Objectionable content',
        },
        {
          key: 'copyrightViolation',
          label: 'Copyright violation',
        },
      ],
    },
    question: {
      label: 'Question',
      reasons: [
        {
          key: 'objectionableContent',
          label: 'Objectionable content',
        },
      ],
    },
    answer: {
      label: 'Answer',
      reasons: [
        {
          key: 'objectionableContent',
          label: 'Objectionable content',
        },
      ],
    },
    comment: {
      label: 'Comment',
      reasons: [
        {
          key: 'objectionableContent',
          label: 'Objectionable content',
        },
      ],
    },
  };
  const handleChangeReportReason = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.currentTarget;
    setReportReason(value);
  };

  const handleSubmitReport = async () => {
    if (!reportReason) {
      toast.error('Please select a report reason');
      return;
    }
    try {
      await reportAPI.submitReport(reportObjectId, reportReason, type);
      toast.success('Your report has been sent');
      onClose();
    } catch (e) {
      toast.error(getErrorMessage(e));
    }
  };
  return (
    <Modal show={show} onHide={() => onClose()} centered>
      <Form>
        <Modal.Header closeButton>
          <Modal.Title>Report This {reportTypeContent[type].label} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form.Select
              onChange={e => handleChangeReportReason(e)}
              defaultValue="placeholder"
            >
              <option disabled value="placeholder">
                Please select a report reason
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
          <Button variant="secondary" onClick={() => onClose()}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmitReport()}>
            Send report
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ReportModal;

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
