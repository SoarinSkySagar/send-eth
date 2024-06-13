const TxDetails  = ({ sender, receiver, amount, uid }) => {
  return (
    <div className="container mx-auto mt-8">
      <table className="min-w-full divide-y divide-gray-200">
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              Sender
            </th>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {sender}
            </td>
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              Receiver
            </th>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {receiver}
            </td>
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              Amount (in ETH)
            </th>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {amount}
            </td>
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              UID
            </th>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {uid}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TxDetails    ;
