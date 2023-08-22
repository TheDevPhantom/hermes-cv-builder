import Input from '../../components/Input/Input';
import useStore from '../../store/store';
import './_styles.profile.scss';

const Profile = () => {
  const { profileDetails, setProfileDetails } = useStore();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileDetails({ [name]: value });
  };

  return (
    <div className='profile-screen'>
      <Input
        label='Title'
        placeholder='Developer'
        name='title'
        onChange={onChange}
        value={profileDetails.title}
      />
      <div className='form-row'>
        <Input
          label='First Name'
          placeholder='John'
          name='firstName'
          onChange={onChange}
          value={profileDetails.firstName}
        />
        <Input
          label='Last Name'
          placeholder='Doe'
          name='lastName'
          onChange={onChange}
          value={profileDetails.lastName}
        />
      </div>
      <div className='form-row'>
        <Input
          label='Email'
          placeholder='john@example.com'
          name='email'
          onChange={onChange}
          value={profileDetails.email}
        />
        <Input
          label='Contact Number'
          placeholder='000 000 0000'
          name='contactNumber'
          onChange={onChange}
          value={profileDetails.contactNumber}
        />
      </div>
      <Input
        label='Bio'
        type='textarea'
        placeholder='About me'
        name='bio'
        onChange={onChange}
        value={profileDetails.bio}
        rows={10}
      />
      <div className='form-row'>
        <Input
          label='LinkedIn'
          placeholder='https://www.linkedin.com/in/johndoe'
          name='linkedin'
          onChange={onChange}
          value={profileDetails.linkedin}
        />
        <Input
          label='GitHub'
          placeholder='https://github.com/johndoe'
          name='github'
          onChange={onChange}
          value={profileDetails.github}
        />
        <Input
          label='Dribbble'
          placeholder='https://dribbble.com/johndoe'
          name='dribbble'
          onChange={onChange}
          value={profileDetails.dribbble}
        />
      </div>
    </div>
  );
};

export default Profile;
